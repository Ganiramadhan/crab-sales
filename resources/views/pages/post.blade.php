<x-layout>
    <h1 class="text-3xl font-bold mb-4">{{ $title }}</h1>

    <!-- Search Input -->
    <div class="mb-4">
        <input type="text" id="search-input" class="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Search posts...">
    </div>

    <!-- Button to open the Add New Post modal -->
    <button id="open-add-modal" class="bg-blue-500 text-white px-4 py-2 rounded mb-4 flex items-center">
        <i class="fas fa-plus mr-2"></i>Add New Post
    </button>

    <!-- Add/Edit Post Modal -->
    <div id="post-modal" class="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center hidden z-50">
        <div class="bg-white rounded-lg shadow-lg p-6 w-full max-w-lg relative">
            <button id="close-modal" class="absolute top-2 right-2 text-gray-600 hover:text-gray-800">
                <i class="fas fa-times"></i>
            </button>
            <form id="post-form" action="" method="POST" enctype="multipart/form-data">
                @csrf
                <input type="hidden" name="_method" id="form-method">
                <input type="hidden" name="existing_slug" id="existing_slug">
                <input type="hidden" name="slug" id="slug">
                <div class="mb-4">
                    <label for="title" class="block text-sm font-medium text-gray-700">Title <span class="text-red-500">*</span></label>
                    <input type="text" id="title" name="title" class="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mt-1" placeholder="Enter post title" required>
                </div>
                <div class="mb-4">
                    <label for="content" class="block text-sm font-medium text-gray-700">Content <span class="text-red-500">*</span></label>
                    <textarea id="content" name="content" class="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mt-1" rows="6" placeholder="Enter post content" required></textarea>
                </div>
                <div class="mb-4">
                    <label for="category_id" class="block text-sm font-medium text-gray-700">Category <span class="text-red-500">*</span></label>
                    <select id="category_id" name="category_id" class="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mt-1" required>
                        <option value="">Select a category</option>
                        @foreach($categories as $category)
                            <option value="{{ $category->id }}">{{ $category->category }}</option>
                        @endforeach
                    </select>
                </div>
                <div class="mb-4">
                    <label for="image" class="block text-sm font-medium text-gray-700">Image (optional)</label>
                    <input type="file" id="image" name="image" class="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mt-1">
                    <div id="image-preview" class="mt-2"></div>
                </div>
                <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded flex items-center">
                    <i class="fas fa-save mr-2"></i>Save Post
                </button>
            </form>
        </div>
    </div>

    <!-- All Posts Section -->
    <div class="posts grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4" id="posts-container">
        @foreach($posts as $post)
            <div class="post-item border border-gray-300 rounded-lg p-4 h-96 flex flex-col transition-transform transform hover:scale-105 hover:shadow-lg duration-300 ease-in-out">
                @if($post->image)
                    <img src="{{ asset('storage/' . $post->image) }}" alt="{{ $post->title }}" class="w-full h-40 object-cover mb-4">
                @endif
                <div class="flex justify-between items-start mb-2">
                    <h2 class="text-xl font-semibold flex-grow">{{ $post->title }}</h2>
                    
                    <!-- Category as Badge -->
                    <span class="text-xs font-semibold inline-block py-1 px-2 uppercase rounded text-white bg-blue-500">
                        {{ $post->category->category }}
                    </span>
                </div>
                <p class="text-gray-700 mb-4 flex-grow">{{ \Illuminate\Support\Str::limit($post->content, 100) }}</p>
                
                <div class="mt-4 flex">
                    <button type="button" class="text-green-500 hover:text-green-700" onclick="editPost('{{ $post->slug }}')">
                        <i class="fas fa-edit"></i> Edit
                    </button>
                    
                    <form action="{{ route('posts.destroy', $post->slug) }}" method="POST" class="inline-block ml-2" id="delete-form-{{ $post->slug }}">
                        @csrf
                        @method('DELETE')
                        <button type="button" onclick="confirmDelete('{{ $post->slug }}')" class="text-red-500 px-4 py-2 rounded flex items-center hover:text-red-700">
                            <i class="fas fa-trash-alt mr-2"></i> Delete
                        </button>
                    </form>
                </div>
            </div>
        @endforeach
    </div>

    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <script>
        $(document).ready(function() {
            // Open the add post modal
            $('#open-add-modal').click(function() {
                const form = $('#post-form');
                form.attr('action', "{{ route('posts.store') }}");
                $('#form-method').val('POST');
                $('#existing_slug').val('');
                $('#slug').val('');
                form[0].reset(); 
                $('#image-preview').html(''); 
                $('#post-modal').removeClass('hidden');
            });

            // Close the modal
            $('#close-modal').click(function() {
                $('#post-modal').addClass('hidden');
            });

            $(window).click(function(event) {
                if ($(event.target).is('#post-modal')) {
                    $('#post-modal').addClass('hidden');
                }
            });

            // Edit post
            window.editPost = function(slug) {
                $.get(`/posts/${slug}/edit`, function(data) {
                    const form = $('#post-form');
                    form.attr('action', `/posts/${data.slug}`);
                    $('#form-method').val('PUT');
                    $('#existing_slug').val(data.slug);
                    $('#slug').val(data.slug);
                    $('#title').val(data.title);
                    $('#content').val(data.content);

                    // Set selected category
                    $('#category_id').val(data.category_id);

                    const imagePreview = $('#image-preview');
                    if (data.image) {
                        imagePreview.html(`<img src="/storage/${data.image}" alt="Image Preview" class="w-full h-32 object-cover mt-2">`);
                    } else {
                        imagePreview.html('');
                    }

                    $('#post-modal').removeClass('hidden');
                });
            }

            $('#image').change(function(event) {
                const file = event.target.files[0];
                const preview = $('#image-preview');

                if (file) {
                    const reader = new FileReader();
                    reader.onload = function(e) {
                        preview.html(`<img src="${e.target.result}" alt="Image Preview" class="w-full h-32 object-cover mt-2">`);
                    };
                    reader.readAsDataURL(file);
                } else {
                    preview.html('');
                }
            });

            // Confirm delete
            window.confirmDelete = function(slug) {
                Swal.fire({
                    title: 'Are you sure?',
                    text: "You won't be able to revert this!",
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Yes, delete it!',
                }).then((result) => {
                    if (result.isConfirmed) {
                        $(`#delete-form-${slug}`).submit();
                    }
                });
            }

            // Real-time search functionality
            $('#search-input').on('keyup', function() {
                const searchTerm = $(this).val().toLowerCase();
                $('.post-item').each(function() {
                    const title = $(this).find('h2').text().toLowerCase();
                    $(this).toggle(title.indexOf(searchTerm) > -1);
                });
            });
        });
    </script>
</x-layout>
