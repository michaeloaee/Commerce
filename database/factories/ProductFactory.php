<?php

use App\Product;
use Faker\Generator as Faker;

function generateImage()
{
    $images = range(1, 15);

    return "/img/{$images[array_rand($images)]}.jpg";
}

$factory->define(Product::class, function (Faker $faker) {
    return [
        'name'        => $faker->name,
        'image'       => generateImage(),
        'description' => $faker->paragraph,
    ];
});
