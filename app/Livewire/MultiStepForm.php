<?php

namespace App\Livewire;

use Livewire\WithFileUploads;
use Livewire\Component;

class MultiStepForm extends Component
{
    use WithFileUploads;
    public $step = 1;
    public $email;
    public $country;
    public $number;
    public $message;
    public $import_file;
    protected $rules = [];
    public $selectedCountryName = 'Select Country';

    public function render()
    {
        return view('livewire.multi-step-form')->layout('layouts.app');
    }

    public function nextStep()
    {
        // Validate based on the current step
        // dd($this->country);
        if ($this->step === 1) {
            $this->validate([
                'email' => 'required|email',
            ]);
        } elseif ($this->step === 2) {
            // Add validation rules for step 2
            $this->validate([
                'message' => 'required',
                // Add other rules for step 2 fields
            ]);
        } elseif ($this->step === 3) {
            // Add validation rules for step 3 if needed
            $this->validate([
                'import_file' => 'required',
                // Add other rules for step 2 fields
            ]);
        }
        $this->step++;
    }

    public function prevStep()
    {
        $this->step--;
    }
    public function selectCountry($value, $name)
    {
        $this->country = $name;
        $this->selectedCountryName = $name;
    }

    public function updatedImportFile()
    {
        $this->validate([
            'import_file' => 'image|max:1024', // Adjust the validation rules as needed
        ]);

        $path = $this->import_file->store('public/uploads');
        $this->import_file = basename($path); // Store only the file name in the database
    }
    public function isSummaryStep()
    {
        $this->step = 4;
    }

    public function submitForm()
    {
        // $this->validate();

        // Store or process the form data here
        // For simplicity, we'll just display a success message
        session()->flash('success', 'Your details have been submitted successfully.!');

        // Reset the form or redirect as needed
        $this->reset();
    }
}
