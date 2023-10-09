@component('mail::message')
<div>
  <p>Dear {{$user->name}},</p>
  <p>Thank you for posting your ad on Zecodo. We are excited to help you showcase your Service to our community of buyers.We wanted to let you know that your Deposit account is still not connected as per our system. It is imperative for you to connect your deposit account, so that we can make the payment into your account once your product is delivered.</p>
  <p>Please click on the following URL to connect your deposit account now</p>
  <p><a href="https://Zecodo.com/user/account">Connected Account</a></p>
  <p>Thank you for choosing Zecodo. We look forward to seeing your ad live on our site soon!</p>
  <p>Best regards,</p>
  <p><b>Zecodo Support Team</b></p>
</div>
@endcomponent