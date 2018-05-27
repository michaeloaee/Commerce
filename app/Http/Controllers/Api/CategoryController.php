<?php

namespace App\Http\Controllers\Api;

use App\Category;
use App\Http\Requests\CategoryRequest;
use App\Http\Controllers\Controller;

class CategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return array
     */
    public function index()
    {
        $nodes = [];
        $roots = Category::roots()
                         ->reOrderBy('created_at', 'desc')
                         ->get();

        foreach ($roots as $root) {
            $chain   = $root->getDescendantsAndSelf()
                            ->toHierarchy()
                            ->toArray();
            $nodes[] = $chain[key($chain)];
        }

        return $nodes;
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param CategoryRequest $request
     *
     * @return Category|\Illuminate\Database\Eloquent\Model
     */
    public function store(CategoryRequest $request)
    {
        if ($request->parent_id) {
            return Category::findOrFail($request->parent_id)
                           ->children()
                           ->create($request->all());
        }

        return response()->json(Category::create($request->all()), 201);
    }

    /**
     * Display the specified resource.
     *
     * @param Category $category
     *
     * @return Category
     */
    public function show(Category $category)
    {
        return $category->getDescendantsAndSelf()->toHierarchy();
    }

    /**
     * Update the specified resource in storage.
     *
     * @param CategoryRequest $request
     * @param Category $category
     *
     * @return Category
     */
    public function update(CategoryRequest $request, Category $category)
    {
        if ($request->parent_id) {
            $root = Category::findOrFail($request->parent_id);
            $category->makeChildOf($root);
        } else {
            $category->makeRoot();
        }

        $category->update($request->all());

        return response()->json($category, 200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param Category $category
     *
     * @return \Illuminate\Http\JsonResponse
     * @throws \Exception
     */
    public function destroy(Category $category)
    {
        $category->delete();

        return response()->json(null, 204);
    }
}
