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
        $prodLimit = 10;

        foreach (['categories', 'products'] as $item) {
            DB::table($item)->delete();
        }

        factory(Category::class, $catLimit)->create()->each(function (Category $root) use ($prodLimit) {

            /* @var Category $child1 */
            $child1 = $root->children()
                           ->save(factory(Category::class)->make());

            /* @var Category $child2 */
            $child2 = $child1->children()
                             ->save(factory(Category::class)->make());

            for ($i = 0; $i < $prodLimit; $i++) {
                $root->products()
                     ->save(factory(Product::class)->make());

                $child1->products()
                       ->save(factory(Product::class)->make());

                $child2->products()
                       ->save(factory(Product::class)->make());
            }

            echo "- $root->name с товарами создана.\n";
        });
    }
}
