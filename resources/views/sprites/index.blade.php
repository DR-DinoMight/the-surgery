<x-app-layout>
    <x-slot name="header">
        <h2 class="text-xl font-semibold leading-tight text-gray-800">
            {{ __('Sprites') }}
        </h2>
    </x-slot>

    <div class="py-12">
        <div class="mx-auto max-w-7xl sm:px-6 lg:px-8">
                <div class="overflow-hidden bg-white shadow sm:rounded-md">
                    <ul class="divide-y divide-gray-200">
                        @foreach ($sprites as $sprite)
                            <li>
                                <a href="{{route('sprites.create')}}" class="block hover:bg-gray-50">
                                <div class="flex items-center px-4 py-4 sm:px-6">
                                    <div class="flex items-center flex-1 min-w-0">
                                    <div class="flex-shrink-0">
                                        <img class="w-12 h-12 rounded-full" src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixqx=pkzf0oTlPK&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="">
                                    </div>
                                    <div class="flex-1 min-w-0 px-4 md:grid md:grid-cols-2 md:gap-4">
                                        <div>
                                        <p class="text-sm font-medium text-indigo-600 truncate">Ricardo Cooper</p>
                                        <p class="flex items-center mt-2 text-sm text-gray-500">
                                            <!-- Heroicon name: solid/mail -->
                                            <svg class="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                            <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                                            <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                                            </svg>
                                            <span class="truncate">ricardo.cooper@example.com</span>
                                        </p>
                                        </div>
                                        <div class="hidden md:block">
                                        <div>
                                            <p class="text-sm text-gray-900">
                                            Applied on
                                            <time datetime="2020-01-07">January 7, 2020</time>
                                            </p>
                                            <p class="flex items-center mt-2 text-sm text-gray-500">
                                            <!-- Heroicon name: solid/check-circle -->
                                            <svg class="flex-shrink-0 mr-1.5 h-5 w-5 text-green-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                                            </svg>
                                            Completed phone screening
                                            </p>
                                        </div>
                                        </div>
                                    </div>
                                    </div>
                                    <div>
                                    <!-- Heroicon name: solid/chevron-right -->
                                    <svg class="w-5 h-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                        <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
                                    </svg>
                                    </div>
                                </div>
                                </a>
                            </li>
                        @endforeach
                    </ul>
                </div>
        </div>
    </div>
</x-app-layout>
