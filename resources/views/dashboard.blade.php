<x-app-layout>
    <x-slot name="header">
        <h2 class="text-xl font-semibold leading-tight text-gray-800">
            {{ __('Dashboard') }}
        </h2>
    </x-slot>

    <div class="py-12">
        <div class="mx-auto max-w-7xl sm:px-6 lg:px-8">
            <div class="overflow-hidden bg-white shadow-xl sm:rounded-lg">
                <form action="{{route('dashboard.store_settings')}}" method="POST">
                    @csrf
                    <label for="event_sub_url"></label>
                    <input type="url" required name="event_sub_url" id="event_sub_url" />
                    <button type="submit">Save</button>
                </form>
            </div>
        </div>
    </div>
</x-app-layout>
