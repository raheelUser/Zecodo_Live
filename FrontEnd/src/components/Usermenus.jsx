import React from 'react'

const Userdashboardmenu = () => {
  return (
    <>
    {/* SIDE NAV START */}
    <div className='usermenus'>
    <nav class="navbar navbar-expand-lg bg-body-tertiary">
  <div class="container-fluid">
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse" id="navbarNav">
      <ul class="navbar-nav">
        <li class="nav-item">
          <a class="nav-link active" aria-current="page" href="/myprofile">My Profile</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="/allshoppingorders">My Orders</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="/mywarehouse">My Warehouse</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="/mywallet">My Wallet</a>
        </li>
        <li class="nav-item">
        <a class="nav-link" href="/mywishlist">My Wish List</a>
        </li>
        <li class="nav-item">
        <a class="nav-link" href="/myshoppingcart">My Shopping Cart</a>
        </li>
        <li class="nav-item">
        <a class="nav-link" href="/myaddress">My Addresses</a>
        </li>
        <li class="nav-item">
        <a class="nav-link" href="/mypaymentmethods">My Payment Methods</a>
        </li>
        <li class="nav-item">
        <a class="nav-link" href="/mysetting">My Settings</a>
        </li>
        <li class="nav-item">
        <a class="nav-link" href="/mymessage">My Message</a>
        </li>
        <li class="nav-item">
        <a class="nav-link" href="/mysubscription">My Subscriptions</a>
        </li>
        <li class="nav-item">
        <a class="nav-link" href="/">Sign Out</a>
        </li>

      </ul>
    </div>
  </div>
</nav>
</div>
{/* SIDE NAV END */}

    </>
  )
}

export default Userdashboardmenu