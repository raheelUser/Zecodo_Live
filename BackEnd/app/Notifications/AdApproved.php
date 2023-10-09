<?php

namespace App\Notifications;

use App\Mail\BaseMailable;
use App\Models\Order;
use App\Models\Media;
use App\Models\Product;
use App\Models\ShippingDetail;
use App\Models\Prices;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class AdApproved extends Notification
{
    use Queueable;

    protected $status;
    protected $user;
    protected $product;

    /**
     * Create a new notification instance.
     *
     * @return void
     */
    public function __construct($status, $product)
    {
        // $this->product = $product;
        $this->status = $status->status;
        $this->user = $status->name;
        $this->product = $product;
    }

    /**
     * Get the notification's delivery channels.
     *
     * @param  mixed  $notifiable
     * @return array
     */
    public function via($notifiable)
    {
        return ['mail', 'database'];
    }

    /**
     * Get the mail representation of the notification.
     *
     * @param  mixed  $notifiable
     * @return
     */
    public function toMail($notifiable)
    {
        $baseMailable = new BaseMailable();
        $status = $this->status;
        $product = $this->product;
        $url = env('FRONT_END_URL', 'https://localhost:3000/');

        return $baseMailable->to($notifiable->email)
        ->subject($status ? $notifiable->name . '- Your Ad is Now Live on Zecodo!' : $notifiable->name . '- Your Ad is Now Live on Zecodo!')
        ->markdown('emails.addApproved.add', [
            'user' => $notifiable,
            'status' => $status,
            'verificationUrl' => $url.'/product/'.$product->guid,
        ]);
    }

    /**
     * Get the array representation of the notification.
     *
     * @param  mixed  $notifiable
     * @return array
     */
    public function toArray($notifiable)
    {
        $product = $this->product;
        return [
            'message' => 'Your Add has been Approved!',
            'url' => '/product/'.$product->guid,
        ];
    }
}
