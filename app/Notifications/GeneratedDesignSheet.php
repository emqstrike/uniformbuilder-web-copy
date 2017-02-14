<?php

namespace Customizer\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Notification;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Messages\SlackMessage;

class GeneratedDesignSheet extends Notification
{
    use Queueable;

    protected $message;
    protected $channel;
    protected $from;
    protected $icon;

    /**
     * Create a new notification instance.
     *
     * @return void
     */
    public function __construct(
        $message,
        $channel = 'generated-pdfs',
        $from = 'Customizer',
        $icon = ':prolook"'
    )
    {
        $this->message = $message;
        $this->channel = $channel;
        $this->from = $from;
        $this->icon = $icon;
    }

    /**
     * Get the notification's delivery channels.
     *
     * @param  mixed  $notifiable
     * @return array
     */
    public function via($notifiable)
    {
        return [
            // 'mail',
            'slack'
        ];
    }

    /**
     * Get the mail representation of the notification.
     *
     * @param  mixed  $notifiable
     * @return \Illuminate\Notifications\Messages\MailMessage
     */
    public function toMail($notifiable)
    {
        return false;
        return (new MailMessage)
                    ->line('The introduction to the notification.')
                    ->action('Notification Action', url('/'))
                    ->line('Thank you for using our application!');
    }

    /**
     * Get the array representation of the notification.
     *
     * @param  mixed  $notifiable
     * @return array
     */
    public function toArray($notifiable)
    {
        return [
            //
        ];
    }

    public function toSlack($notifiable)
    {
        return (new SlackMessage)
            ->to($this->channel)
            ->from($this->from, $this->icon)
            ->content($this->message);
    }
}
