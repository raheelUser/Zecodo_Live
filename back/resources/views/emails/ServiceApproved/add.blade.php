@component('mail::message')
  <div style="background-color: #f9d9eb; padding:20px;">
        <p>Dear {{$user->name}} ,</p>
        <p>We're excited to let you know that your ad has been approved and is now live on Zecodo! Congratulations on successfully listing your service on our platform.</p>
        <p>Your ad is now available for our community of customers to contact and avail your services.</p>
        <p>To view your ad and manage your listings, please log in to your Zecodo account and navigate to the "My Ads" section. From there, you can view your ad and make any necessary updates or changes.</p>
        <p>If you have any questions or concerns about your ad or your Zecodo experience, please don't hesitate to reach out to our customer support team at <a href="mailto:support@Zecodo.com">support@Zecodo.com</a>.</p>
        <p>Thank you for being a valued member of the Zecodo community. We wish you success in providing serene services to the customers through our platform!</p>
        <p>Best regards,</p>
        <p><b>Zecodo Support Team</b></p>
    </div>
@endcomponent