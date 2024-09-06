<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Product;

class ProductController extends Controller
{
    // Display the list of products
    public function index()
    {
        $products = Product::all();
        // print_r($products);die();

        return view('pages.products.index', [
            'title' => 'Product List',
            'products' => $products
        ]);
    }

    // Show the form for creating a new product
    public function create()
    {
        return view('pages.products.create-product', ['title' => 'Add New Product']);
    }

    // Store a newly created product in the database
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'price' => 'required|numeric',
            'description' => 'nullable|string',
            'stock' => 'required|integer'
        ]);

        Product::create($request->all());

        return redirect()->route('products.index')->with('success', 'Product added successfully.');
    }

    // Show the form for editing the specified product
    public function edit(Product $product)
    {
        return view('pages.products.edit-product', [
            'title' => 'Edit Product',
            'product' => $product
        ]);
    }

    // Update the specified product in the database
    public function update(Request $request, Product $product)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'price' => 'required|numeric',
            'description' => 'nullable|string', 
            'stock' => 'required|integer'
        ]);

        $product->update($request->all());

        return redirect()->route('products.index')->with('success', 'Product updated successfully.');
    }

    // Remove the specified product from the database
    public function destroy(Product $product)
    {
        $product->delete();
        return redirect()->route('products.index')->with('success', 'Product deleted successfully.');
    }
}
