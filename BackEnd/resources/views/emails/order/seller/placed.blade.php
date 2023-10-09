@component('mail::message')
<div>
  <h2>Sold Item Details</h2>
  <p>Dear {{ $user->name }},</p>
  <p>We wanted to inform you that one of our buyers has recently purchased your product, <b>"{{$product->name}}"</b>, through our platform.</p>
  <p>The order details are as follows:</p>
  <table>
    <tr>
      <!-- {{ $prices }} -->
      <td>
        @if(!$media)
          <img src="https://www.salonlfc.com/wp-content/uploads/2018/01/image-not-found-scaled.png" height="70px" width="70px" />
        @elseif($media)
          <img src="{{ $media->url }}" height="70px" width="70px" />
        @endif
      </td>
      <!-- <td><img src="{{Storage::url('users/product/$product->id')}}" height="70px" width="70px" /></td> -->
      <td style="float:left;">{{$product->name}}
        <br />{{$product->description}}
      </td>
    </tr>
  </table>
  <hr />
  <table style="width:100%">
    <tr>
      <td>Order number</td>
      <td>{{$order->id}}</td>
    </tr>
    <tr>
      <td>Invoice date</td>
      <td>{{ \Carbon\Carbon::parse($order->created_at)->format('d/m/Y')}}</td>
    </tr>
    <tr>
      <td>Shipping from</td>
      <td>{{$product->street_address }} - {{ $product->city}}</td>
    </tr>
    <tr>      
      <td>Shipping to</td>
      <td>{{ $shipping[0]->street_address }} - {{ $shipping[0]->city}}</td>
    </tr>
  </table>
  <hr />
  <img src="{{asset('image/sold_image.png')}}" style="z-index:7;position: absolute;left:40%" width="120px" height="120px" />
  <table style="width:100%">
    <tr>
      <td>Seller Name</td>
      <td>{{$product->user->name}}</td>
    </tr>
    <tr>
      <td>Invoice date</td>
      <td>{{ \Carbon\Carbon::parse($order->created_at)->format('d/m/Y')}}</td>
    </tr>
    <tr>
      <td>Shipping from</td>
      <td>{{$product->street_address }} - {{ $product->city}}</td>
    </tr>
    <tr>      
      <td>Shipping to</td>
      <td>{{ $shipping[0]->street_address }} - {{ $shipping[0]->city}}</td>
    </tr>
  </table>
  <table style="width:100%">
    <tr>
      <td><b> Seller Name </b></td>
      <td><b>{{$product->user->name}}</b></td>
    </tr>
    <tr>
      <td><b>Payment method</b></td>
      <td><b>ONLINE</b></td>
    </tr>
  </table>
  <hr />
  <table style="width:100%">
    <tr>
      <td>Item price</td>
      <td>
        @if($order->offer_id)
          {{$order->price}}
        @elseif(!$order->offer_id)
          {{$product->price}}
        @endif
      </td>
    </tr>
    <tr>
      <td>Shipping</td>
      <td>{{$order->shipping_rates}}</td>
    </tr>
  </table>
  <table style="width:100%">
  @foreach($totalprices as $price)
    @foreach(json_decode($price->prices) as $rate)
        <tr>
          <td>{{  $rate-> name }}</td>
          <!-- 2.9 is stripe Percentage + 0.30 is 30 cents + 2.9/100 + 0.30 -->
          <td>{{  $rate-> value *($product->price/100) }}</td>
        </tr>
    @endforeach
  @endforeach
    <!-- <tr>
      <td>Sales tax (estimated)</td>
      <td>$0.00</td>
    </tr> -->
  </table>
  <table style="width:100%">
    <tr>
      <td>
        You Pay
      </td>
      <td>
        {{$order->price}}
      </td>
    </tr>
  </table>
  <hr />
  <table style="width:100%">
    <tr>
      <td style="float:left"><b> Status </b></td>
      <td style="float:right">
      <!-- <td><i>{{$order->tracking_id}}</i> -->
        <div style="color:grey, font-style: italic;">Pending Shipment</div>
        <div style="color:pink"><a href="https://track.easypost.com/djE6dHJrX2YzOTU0MWJkOWYyMzQ3NWU5OTNjMzA0MDgxOTZiZmY2">Track our Item?</a></div>
      </td>
    </tr>
  </table>
  <p>Thank you for using Zecodo as a marketplace for your products. We look forward to continued success working with you.</p>
  <p>Best regards,</p>
  <p>Zecodo Support Team</p>
</div>
<style>
  body{
    font-size: 13px;
  }
  table{
    width:100%;
  }
</style>
@endcomponent