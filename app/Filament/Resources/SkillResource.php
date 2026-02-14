<?php

namespace App\Filament\Resources;

use App\Filament\Resources\SkillResource\Pages;
use App\Models\Skill;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables\Table;

use Filament\Forms\Components\Select;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Toggle;

use Filament\Tables\Columns\IconColumn;
use Filament\Tables\Columns\TextColumn;

class SkillResource extends Resource
{
    protected static ?string $model = Skill::class;

    protected static ?string $navigationIcon = 'heroicon-o-wrench-screwdriver';
    protected static ?string $navigationGroup = 'Portfolio';
    protected static ?string $navigationLabel = 'Skills';

    public static function form(Form $form): Form
    {
        return $form->schema([
            TextInput::make('name')
                ->required()
                ->maxLength(50),

            Select::make('category')
                ->required()
                ->options([
                    'Frontend' => 'Frontend',
                    'Backend' => 'Backend',
                    'DevOps' => 'DevOps',
                    'Tools' => 'Tools',
                    'Mobile' => 'Mobile',
                ])
                ->searchable(),

            TextInput::make('level')
                ->numeric()
                ->minValue(1)
                ->maxValue(5)
                ->default(3)
                ->required(),

            TextInput::make('sort_order')
                ->numeric()
                ->default(0),

            Toggle::make('is_featured')
                ->default(false),
        ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('name')->searchable()->sortable(),
                TextColumn::make('category')->sortable(),
                TextColumn::make('level')->sortable(),
                IconColumn::make('is_featured')->boolean(),
                TextColumn::make('sort_order')->sortable(),
                TextColumn::make('updated_at')->dateTime()->sortable()->toggleable(isToggledHiddenByDefault: true),
            ])
            ->defaultSort('sort_order')
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
            'index' => Pages\ListSkills::route('/'),
            'create' => Pages\CreateSkill::route('/create'),
            'edit' => Pages\EditSkill::route('/{record}/edit'),
        ];
    }
}
