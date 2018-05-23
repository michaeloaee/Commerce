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
        $limit = 5;

        foreach (['categories', 'products'] as $item) {
            DB::table($item)->delete();
        }

        factory(Category::class, $limit)->create()->each(function (Category $cat) {
            $cat->products()->save(factory(Product::class)->make());

            /* @var Category $child1 */
            $child1 = $cat->children()
                          ->save(factory(Category::class)->make());
            $child1->products()
                   ->save(factory(Product::class)->make());

            /* @var Category $child2 */
            $child2 = $child1->children()
                             ->save(factory(Category::class)->make());
            $child2->products()
                   ->save(factory(Product::class)->make());
        });
    }
}
