@component('mail::message')
    <div style="background-color: #f9d9eb; padding:20px;">
        <h3>Welcome to Zecodo</h3>
        <p>Dear {{$user->name}}</p>
        <p>Thank you again for choosing Zecodo. We look forward to helping you find the perfect items you're looking for.</p>
        <p>Best regards,</p>
        <p>Zecodo Support</p>
    </div>
@endcomponent