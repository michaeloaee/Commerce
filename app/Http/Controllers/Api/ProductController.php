<?php

namespace App\Http\Controllers\Api;

use App\Category;
use App\Http\Controllers\Controller;
use App\Http\Requests\ProductRequest;
use App\Product;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Category $category)
    {
        return $category
            ->products()
            ->orderByDesc('created_at')
            ->get();
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param Category $category
     * @param ProductRequest $request
     *
     * @return Product|\Illuminate\Database\Eloquent\Model
     */
    public function store(Category $category, ProductRequest $request)
    {
        $request->merge([
            'category_id' => $category->id,
        ]);

        $p = Product::create($request->all());

        return response()->json($p, 201);
    }

    /**
     * Display the specified resource.
     *
     * @param Product $product
     *
     * @return Product
     */
    public function show(Product $product)
    {
        return $product;
    }

    /**
     * Update the specified resource in storage.
     *
     * @param ProductRequest $request
     * @param Product $product
     *
     * @return Product
     */
    public function update(ProductRequest $request, Product $product)
    {
        $product->update($request->all());

        return response()->json($product, 200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param Product $product
     *
     * @return \Illuminate\Http\JsonResponse
     * @throws \Exception
     */
    public function destroy(Product $product)
    {
        $product->delete();

        return response()->json(null, 204);
    }
}
