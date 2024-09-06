<x-Layout>
    <h1 class="text-3xl font-bold mb-6">{{ $title }}</h1>

    <form action="{{ route('products.store') }}" method="POST" class="bg-white p-6 rounded-lg shadow-md">
        @csrf
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
                <label for="name" class="block text-gray-600 text-sm font-medium mb-2">Name</label>
                <input type="text" id="name" name="name" placeholder="Input name" class="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" required>
            </div>
            <div>
                <label for="price" class="block text-gray-600 text-sm font-medium mb-2">Price</label>
                <input type="number" id="price" name="price" placeholder="Input price" class="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" required>
            </div>
            <div>
                <label for="description" class="block text-gray-600 text-sm font-medium mb-2">Description</label>
                <textarea id="description" name="description" rows="4" placeholder="Input description" class="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"></textarea>
            </div>
            <div>
                <label for="stock" class="block text-gray-600 text-sm font-medium mb-2">Stock</label>
                <input type="number" id="stock" name="stock" placeholder="Input stock" class="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" required>
            </div>
            <div class="col-span-2">
                <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded-md shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 flex items-center">
                    <i class="fas fa-save mr-2"></i>
                    Save
                </button>
            </div>
            
        </div>
    </form>
</x-Layout>
