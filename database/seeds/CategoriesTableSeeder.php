<?php

use App\Category;
use App\Product;
use Illuminate\Database\Seeder;

class CategoriesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $catLimit  = 5;
        $prodLimit = 5;

        foreach (['categories', 'products'] as $item) {
            DB::table($item)->delete();
        }

        factory(Category::class, $catLimit)->create()->each(function (Category $root) use ($prodLimit) {

            // Categories
            for ($i = 0; $i < $prodLimit; $i++) {

                /* @var Category $child1 */
                $child1 = $root->children()
                               ->save(factory(Category::class)->make());

                // Products
                for ($j = 0; $j < $prodLimit; $j++) {
                    $child1->products()
                           ->save(factory(Product::class)->make());
                }
            }

            echo "- $root->name с товарами создана.\n";
        });
    }
}
