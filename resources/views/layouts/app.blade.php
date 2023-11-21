<!DOCTYPE html>
<html lang="en">
@include('layouts.partials.head')

<body>
    {{ $slot }}
    @livewireScripts
</body>

</html>
