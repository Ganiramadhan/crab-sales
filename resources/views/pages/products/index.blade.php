<x-Layout>
    <h1 class="text-3xl font-bold mb-6 text-gray-800">{{ $title }}</h1>
    
    <div class="overflow-x-auto shadow-lg rounded-lg border border-gray-200">
        <table class="min-w-full bg-white rounded-lg">
            <thead class="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                <tr>
                    <th class="py-3 px-6 text-left">Name</th>
                    <th class="py-3 px-6 text-left">Description</th>
                    <th class="py-3 px-6 text-left">Price</th>
                    <th class="py-3 px-6 text-left">Stock</th>
                    <th class="py-3 px-6 text-left">Actions</th>
                </tr>
            </thead>
            <tbody class="text-gray-600 text-sm font-light">
                @foreach ($products as $product)
                    <tr class="border-b border-gray-200 hover:bg-gray-50 transition ease-in-out duration-150">
                        <td class="py-4 px-6 whitespace-nowrap">{{ $product->name }}</td>
                        <td class="py-4 px-6 whitespace-nowrap">{{ $product->description }}</td>
                        <td class="py-4 px-6 whitespace-nowrap">Rp{{ number_format($product->price, 0, ',', '.') }}</td>
                        <td class="py-4 px-6 whitespace-nowrap">{{ $product->stock }}</td>
                        <td class="py-4 px-6 flex space-x-2">
                            <a href="{{ route('products.edit', $product->id) }}" class="text-blue-500 hover:text-blue-700 flex items-center">
                                <i class="fas fa-edit mr-1"></i>
                                Edit
                            </a>
                            <form action="{{ route('products.destroy', $product->id) }}" method="POST" class="inline-flex items-center delete-form">
                                @csrf
                                @method('DELETE')
                                <button type="submit" class="text-red-500 hover:text-red-700 flex items-center">
                                    <i class="fas fa-trash-alt mr-1"></i>
                                    Delete
                                </button>
                            </form>
                        </td>
                    </tr>
                @endforeach
            </tbody>
        </table>
    </div>

    <div class="mt-6 flex justify-end">
        <a href="{{ route('products.create') }}" class="bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-600 transition ease-in-out duration-150 flex items-center">
            <i class="fas fa-plus mr-2"></i>
            Add New Product
        </a>
    </div>
</x-Layout>
