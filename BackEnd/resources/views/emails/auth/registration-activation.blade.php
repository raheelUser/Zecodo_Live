@component('mail::message')
    <div>
    <p>Dear {{$user->name}}</p>
        <p>
        Thank you for registering with Zecodo,to complete your registration process, we need to verify your email address.
        </p>
        <p>
        Please click on the link below or copy and paste it into your web browser to verify your email address:
        </p>
        <p>
        @component('mail::button', ['url' => $verificationUrl, 'color' => 'blue', 'target' => '_blank'])
        <a href="{{$verificationUrl}}">Verify Email Address</a>
        </p>
        <p>
        Please remember that your email address is your username for accessing the Zecodo platform.
        </p>
        <p>
        If you encounter any difficulties with the verification process or have any other questions, please do not hesitate to contact our support team at support@Zecodo.com
        </p>
        <p>Thank you for choosing Zecodo.</p>
    </div>
@endcomponent