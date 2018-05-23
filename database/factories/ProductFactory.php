<?php

use App\Product;
use Faker\Generator as Faker;

$factory->define(Product::class, function (Faker $faker) {
    return [
        'name'        => $faker->name,
        'image'       => 'http://lorempixel.com/300/300/food/',
        'description' => $faker->paragraph,
    ];
});
