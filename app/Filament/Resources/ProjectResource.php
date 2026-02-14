<?php

namespace App\Filament\Resources;

use App\Filament\Resources\ProjectResource\Pages;
use App\Models\Project;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables\Table;

use Filament\Forms\Components\Grid;
use Filament\Forms\Components\MarkdownEditor;
use Filament\Forms\Components\Repeater;
use Filament\Forms\Components\Section;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\Toggle;
use Filament\Forms\Set;

use Filament\Tables\Columns\IconColumn;
use Filament\Tables\Columns\TextColumn;

use Illuminate\Support\Str;

// Media upload component (only works if filament/spatie-laravel-media-library-plugin installed)
use Filament\Forms\Components\SpatieMediaLibraryFileUpload;

class ProjectResource extends Resource
{
    protected static ?string $model = Project::class;

    protected static ?string $navigationIcon = 'heroicon-o-squares-2x2';
    protected static ?string $navigationGroup = 'Portfolio';
    protected static ?string $navigationLabel = 'Projects';

    public static function form(Form $form): Form
    {
        return $form->schema([
            Section::make('Project Info')->schema([
                Grid::make(2)->schema([
                    TextInput::make('title')
                        ->required()
                        ->maxLength(191)
                        ->live(onBlur: true)
                        ->afterStateUpdated(fn (Set $set, ?string $state) => $set('slug', Str::slug($state ?? ''))),

                    TextInput::make('slug')
                        ->required()
                        ->maxLength(191)
                        ->unique(ignoreRecord: true),
                ]),

                TextInput::make('tagline')->maxLength(191),

                Textarea::make('description')
                    ->rows(4)
                    ->columnSpanFull(),

                MarkdownEditor::make('case_study')
                    ->label('Case Study (Problem → Solution → Results)')
                    ->columnSpanFull(),
            ]),

            Section::make('Skills & Content')->schema([
                Select::make('skills')
                    ->relationship('skills', 'name')
                    ->multiple()
                    ->preload()
                    ->searchable()
                    ->columnSpanFull(),

                Repeater::make('responsibilities')
                    ->schema([
                        TextInput::make('item')
                            ->required()
                            ->placeholder('e.g. Built admin dashboard with Filament'),
                    ])
                    ->defaultItems(0)
                    ->columnSpanFull()
                    // store as simple string array
                    ->mutateDehydratedStateUsing(fn ($state) =>
                        array_values(array_filter(array_map(fn ($row) => $row['item'] ?? null, $state ?? [])))
                    ),

                Repeater::make('highlights')
                    ->schema([
                        TextInput::make('item')
                            ->required()
                            ->placeholder('e.g. Improved load time by 40%'),
                    ])
                    ->defaultItems(0)
                    ->columnSpanFull()
                    ->mutateDehydratedStateUsing(fn ($state) =>
                        array_values(array_filter(array_map(fn ($row) => $row['item'] ?? null, $state ?? [])))
                    ),
            ]),

            Section::make('Links & Visibility')->schema([
                Grid::make(2)->schema([
                    TextInput::make('github_url')->url()->maxLength(191)->nullable(),
                    TextInput::make('live_url')->url()->maxLength(191)->nullable(),
                ]),

                Grid::make(3)->schema([
                    Toggle::make('is_featured')->default(false),
                    Toggle::make('is_published')->default(true),
                    TextInput::make('sort_order')->numeric()->default(0),
                ]),
            ]),

            Section::make('Media')->schema([
                // Comment these two blocks if you haven't installed the spatie filament plugin yet
                SpatieMediaLibraryFileUpload::make('thumbnail')
                    ->collection('thumbnail')
                    ->image()
                    ->imageEditor()
                    ->label('Thumbnail (single)'),

                SpatieMediaLibraryFileUpload::make('gallery')
                    ->collection('gallery')
                    ->image()
                    ->multiple()
                    ->reorderable()
                    ->imageEditor()
                    ->label('Gallery Images'),
            ]),
        ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('title')->searchable()->sortable(),
                IconColumn::make('is_featured')->boolean()->sortable(),
                IconColumn::make('is_published')->boolean()->sortable(),
                TextColumn::make('sort_order')->sortable(),
                TextColumn::make('updated_at')->dateTime()->sortable()->toggleable(isToggledHiddenByDefault: true),
            ])
            ->defaultSort('is_featured', 'desc')
            ->actions([
                \Filament\Tables\Actions\EditAction::make(),
            ])
            ->bulkActions([
                \Filament\Tables\Actions\BulkActionGroup::make([
                    \Filament\Tables\Actions\DeleteBulkAction::make(),
                ]),
            ]);
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListProjects::route('/'),
            'create' => Pages\CreateProject::route('/create'),
            'edit' => Pages\EditProject::route('/{record}/edit'),
        ];
    }
}
