<?php

use App\Http\Controllers\Api;
use App\Http\Controllers\Api\OrderController;
use App\Models\Fedex;
use Illuminate\Support\Facades\Route;
use Illuminate\Http\Request;

header('Access-Control-Allow-Origin: *');
//Access-Control-Allow-Origin: *
header('Access-Control-Allow-Methods:  POST, GET, OPTIONS, PUT, DELETE');
header('Access-Control-Allow-Headers:  Content-Type, X-Auth-Token, Origin, Authorization');
/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/
Route::group(['prefix' => 'auth'], function () {
//    Route::post('login', [Api\AuthController::class,'login']);
//    Route::post('register', [Api\AuthController::class,'register']);

    Route::group(['middleware' =>  'cors', 'auth:api'], function () {
        Route::get('logout', [Api\AuthController::class, 'logout']);
        Route::get('user', [Api\AuthController::class, 'user']);
        Route::post('logout', [Api\AuthController::class, 'logout']);
    });
});

Route::post('auth/verify/{id}/{hash}', [\App\Http\Controllers\Auth\VerificationController::class, 'verifyRegisterUser']);
Route::get('products', [Api\ProductController::class, 'index']);
//Route::patch('products/{id}',[Api\ProductController::class,'update']);
Route::delete('products/{id}', [Api\ProductController::class, 'destroy']);

//
Route::group(['prefix' => '/auth', ['middleware' => 'checkuserlogin']], function () {
    Route::post('onsuccessFullLogin/{token}', [Api\AuthController::class, 'onsuccessFullLogin']);
});


//
Route::group(['prefix' => '/auth', ['middleware' => 'throttle:20,5']], function () {
    // Route::post('/register', [Api\Auth\RegisterController::class, 'register']);
    Route::post('/login', [Api\Auth\LoginController::class, 'login']);
    Route::post('/facebook-login', [Api\Auth\LoginController::class, 'facebookLogin']);
    Route::post('/google-login', [Api\Auth\LoginController::class, 'googleLogin']);
    Route::post('/apple-login', [Api\Auth\LoginController::class, 'appleLogin']);
    Route::post('logout', [Api\AuthController::class, 'logout']);
});

//===============================All the below route should be in Secure routes==============================
Route::group(['middleware' => 'auth:api'], function () {
    Route::get('categories-secure', [Api\CategoryController::class, 'index']);
    Route::group(['prefix' => '/categories'], function () {

//        Route::get('/', [Api\CategoryController::class, 'index']);
//        Route::get('categories', [Api\CategoryController::class, 'index']);
        Route::get('/{category}', [Api\CategoryController::class, 'show']);
        Route::post('/store', [Api\CategoryController::class, 'store']);
    });

    
    Route::group(['prefix' => '/cart'], function () {
        Route::post('/add', [Api\UserCartController::class, 'store']);
        Route::get('/', [Api\UserCartController::class, 'index']);
        Route::get('/self', [Api\UserCartController::class, 'self']);    
        Route::post('/clear/{id}', [Api\UserCartController::class, 'clear']);    
        Route::delete('/destroy/{id}', [Api\UserCartController::class, 'destroy']);    
        Route::put('/update/{id}', [Api\UserCartController::class, 'update']); 
    });

        
    Route::group(['prefix' => '/userpayments'], function () {
        Route::post('/add', [Api\UserPaymentsController::class, 'store']);
        Route::get('/', [Api\UserPaymentsController::class, 'index']);
        Route::get('/self', [Api\UserPaymentsController::class, 'self']);    
        Route::delete('/destroy/{id}', [Api\UserPaymentsController::class, 'destroy']);    
        Route::put('/update/{id}', [Api\UserPaymentsController::class, 'update']); 
    });

    Route::group(['prefix' => '/shipingzone'], function () {
        Route::post('/', [Api\ShipingZoneController::class, 'store']);
        Route::get('/', [Api\ShipingZoneController::class, 'index']);
        Route::delete('/destroy/{id}', [Api\ShipingZoneController::class, 'destroy']);    
        Route::put('/update/{id}', [Api\ShipingZoneController::class, 'update']); 
    });

    Route::group(['prefix' => '/productAttributes'], function () {
        Route::post('/', [Api\ProductsAttributeController::class, 'store']);
        Route::get('/', [Api\ProductsAttributeController::class, 'index']);
        Route::delete('/destroy/{id}', [Api\ProductsAttributeController::class, 'destroy']);    
        Route::put('/update/{id}', [Api\ProductsAttributeController::class, 'update']); 
    });

    Route::group(['prefix' => '/usersubscriptions'], function () {
        Route::post('/', [Api\UserSubscriptionsController::class, 'store']);
        Route::get('/', [Api\UserSubscriptionsController::class, 'index']);
        Route::get('/self', [Api\UserSubscriptionsController::class, 'self']);    
        Route::get('/unSubscribeCount', [Api\UserSubscriptionsController::class, 'unSubscribeCount']);    
        Route::get('/SubscribeCount', [Api\UserSubscriptionsController::class, 'SubscribeCount']);    
    });

    Route::group(['prefix' => '/mymessages'], function () {
        Route::post('/store', [Api\UserMyMessagesController::class, 'store']);
        Route::get('/', [Api\UserMyMessagesController::class, 'index']);
        Route::get('/self/{uid}', [Api\UserMyMessagesController::class, 'self']);
        Route::get('/unread/self/{uid}', [Api\UserMyMessagesController::class, 'unread']);
        Route::put('/read/{guid}', [Api\UserMyMessagesController::class, 'read']);
    });
    Route::group(['prefix' => '/user'], function () {
        // Route::get('/depositfund', [Api\StripeController::class, 'depositFund']);
        Route::get('detail/', [Api\UserController::class, 'detail']);
        Route::get('detail/{id}', [Api\UserController::class, 'detailById']);
        Route::post('upload', [Api\UserController::class, 'upload']);
        Route::get('conversations', [Api\UserController::class, 'conversations']);
        Route::get('{user}/messages', [Api\UserController::class, 'messages']);
        Route::post('{user}/send-message', [Api\UserController::class, 'sendMessage']);
        Route::post('/deleteAccount/{id}', [Api\UserController::class, 'deleteAccount']);
        Route::post('/cancelDelete/{id}', [Api\UserController::class, 'cancelDelete']);
        Route::post('/update', [Api\UserController::class, 'update']);
        Route::get('/refresh/{user}', [Api\UserController::class, 'refreshOnboardingUrl']);
        Route::get('/checkAccount/{account}', [Api\StripeController::class, 'checkAccount']);
        Route::post('/saveAddress', [Api\SaveAddressController::class, 'store']);
        Route::get('/address/self', [Api\SaveAddressController::class, 'self']);
        Route::get('/address/delete/{id}', [Api\SaveAddressController::class, 'destroy']);
        Route::get('/address/update/{id}', [Api\SaveAddressController::class, 'update']);
        Route::get('/address/getdefault', [Api\SaveAddressController::class, 'getDefault']);
        
    });


    Route::group(['prefix' => '/products'], function () {
        Route::post('/store', [Api\ProductController::class, 'store']);
        Route::patch('/{product:guid}', [Api\ProductController::class, 'update']);
        Route::patch('/ratings/{product:guid}', [Api\ProductController::class, 'ratings']);
        Route::get('/checkRatings/{productId}/{userId}/{orderId}', [Api\ProductController::class, 'checkRatings']);
        Route::get('/self/', [Api\ProductController::class, 'self']);
        Route::get('/like/{value}', [Api\ProductController::class, 'like']);
        // HOTFIX
        // @TODO check why /upload is not working maybe another route with the same name (GIVING 404 on /upload route) is declared.
        Route::post('image-upload/{product:guid}', [Api\ProductController::class, 'upload']);
        Route::post('saved-users/{product:guid}', [Api\ProductController::class, 'saved']);
        Route::get('saved', [Api\ProductController::class, 'getSaved']);
        Route::get('getSaveByUser', [Api\ProductController::class, 'getSaveByUser']);
        Route::get('saved/{id}', [Api\ProductController::class, 'getSavedbyId']);
        Route::post('/{product:guid}/offer', [Api\ProductController::class, 'offer']);
        Route::delete('media/{media:guid}', [Api\ProductController::class, 'deleteMedia']);
        Route::get('offers/buying', [Api\ProductController::class, 'getBuyingOffers']);
        Route::get('orderdproduct', [Api\ProductController::class, 'getOrderdProduct']);
        Route::get('offers/selling', [Api\ProductController::class, 'getSellingOffers']);
        Route::post('/{product:guid}/feature', [Api\ProductController::class, 'feature']);
        Route::post('/{product:guid}/hire', [Api\ProductController::class, 'hire']);
        Route::get('checkUserProductOffer/{id}/{guid}', [Api\ProductController::class, 'checkUserProductOffer']);
        Route::get('getSavedAddress/{guid}', [Api\ProductController::class, 'getSavedAddress']);
        
    });

    Route::group(['prefix' => '/offer'], function () {
        Route::post('status/{offer:guid}', [Api\OfferController::class, 'statusHandler']);
        Route::post('/{offer:guid}', [Api\OfferController::class, 'pendingOffer']);
        Route::post('offerCancel/{id}', [Api\OfferController::class, 'cancelOffer']);
    });

    Route::group(['prefix' => '/services'], function () {
        // Route::get('/', [Api\ServiceController::class, 'index']);
        Route::get('/self/', [Api\ServiceController::class, 'self']);
        Route::post('/', [Api\ServiceController::class, 'store']);
        Route::patch('/{service:guid}', [Api\ServiceController::class, 'update']);
        Route::get('media/{service:guid}', [Api\ServiceController::class, 'media']);
        Route::delete('media/{service:guid}', [Api\ServiceController::class, 'deleteMedia']);
        Route::post('upload/{service:guid}', [Api\ServiceController::class, 'upload']);
        Route::post('/{service:guid}/feature', [Api\ServiceController::class, 'feature']);
        Route::post('/{service:guid}/hire', [Api\ServiceController::class, 'hire']);
        Route::post('saved-users/{service:guid}', [Api\ServiceController::class, 'saved']);
        Route::get('saved', [Api\ServiceController::class, 'getSaved']);

    });

    Route::group(['prefix' => '/notifications'], function () {
        Route::get('/get', [Api\NotificationController::class, 'index']);
        Route::get('/count', [Api\NotificationController::class, 'count']);
        Route::patch('/update/{notificationId}', [Api\NotificationController::class, 'update']);
    });

    Route::get('/message/conversations/{productId}', [Api\MessageController::class, 'conversations']);
    Route::get('/message/conversations', [Api\MessageController::class, 'getUserConversations']);
    Route::post('/message/saveAssociated', [Api\MessageController::class, 'saveAssociated']);
    Route::get('/message/{recipientId}/{productId}', [Api\MessageController::class, 'show']);
    Route::get('/message/checkMessage', [Api\MessageController::class, 'checkMessage']);

    Route::Resources([
        // 'order' => \Api\OrderController::class,
        // 'order' => \Api\UserOrderController::class,
        //'prices' => \Api\PricesController::class,
    ]);
    Route::get('/order/tracking/{id}', [Api\OrderController::class, 'tracking']);
    Route::patch('/order/packed/{id}', [Api\OrderController::class, 'packed']);
    Route::post('/order/ratecalculator', [Api\OrderController::class, 'ratecalculator']);
    Route::post('/order/validatePostalCode', [Api\OrderController::class, 'verifyAddressEasyPost']);
    Route::post('/order/validateAddress', [Api\OrderController::class, 'validateAddress']);
    Route::get('/order/getTrsutedUserData/{id}', [Api\OrderController::class, 'getTrsutedUserData']);
    Route::post('/order/delivered/{id}', [Api\OrderController::class, 'delivered']);
    Route::post('/order/notdelivered/{id}', [Api\OrderController::class, 'notdelivered']);
    Route::group(['prefix' => '/userorder'], function () {
        Route::post('/add', [Api\UserOrderController::class, 'store']);
        Route::get('/', [Api\UserOrderController::class, 'index']);
    });

    Route::group(['prefix' => '/stripe'], function () {
        Route::get('/balance', [Api\StripeController::class, 'balance']);
        Route::get('/Transactions', [Api\StripeController::class, 'getTransactions']);
        Route::get('/PaymentIntents/{id}', [Api\StripeController::class, 'getPaymentIntents']);
        Route::get('/paymentsStatus', [Api\StripeController::class, 'getPaymentsStatus']);
        Route::get('/updateUserAccount', [Api\StripeController::class, 'updateUserAccount']);
        Route::get('/addUserAccforPostAdd/{uuid}', [Api\StripeController::class, 'addUserAccforPostAdd']);
        Route::get('/getBankAccounts', [Api\StripeController::class, 'getBankAccounts']);

    });
    Route::group(['prefix' => '/prices'], function () {
        Route::get('/getbyId/{id}', [Api\PricesController::class, 'getbyId']);
        Route::get('/', [Api\PricesController::class, 'index']);
    });
    //packed
    Route::group(['prefix' => '/trustedseller'], function () {
        Route::post('/create', [Api\TrustedSellerController::class, 'store']);
        Route::get('/{id}', [Api\TrustedSellerController::class, 'get']);
        Route::put('/update/{id}', [Api\TrustedSellerController::class, 'update']);
        Route::get('/show/{user_id}', [Api\TrustedSellerController::class, 'show']);
        Route::post('/file-upload/{id}', [Api\TrustedSellerController::class, 'uploadFile']);
        Route::get('/getUploadFile', [Api\TrustedSellerController::class, 'getUploadFile']);
    });
});
//===============================All the below route should be in Secure routes==============================

//====================================== PUBLIC ROUTES =========================================

Route::group(['prefix' => '/categories', ['middleware' =>  'cors','throttle:20,5']], function () {
    Route::get('/tabs', [Api\CategoryController::class, 'tabs']);
    Route::get('tabs/list', [Api\CategoryController::class, 'tabs']);
    Route::get('/product-attributes/{category}', [Api\CategoryController::class, 'productAttributes']);
    Route::get('/', [Api\CategoryController::class, 'index']);
});

Route::group(['prefix' => '/products'], function () {
    Route::get('/show/{product:guid}', [Api\ProductController::class, 'show']);
    Route::get('media/{product:guid}', [Api\ProductController::class, 'media']);
    Route::get('/search', [Api\ProductController::class, 'search']);
    Route::post('/checkEmailReview/{id}', [Api\ProductController::class, 'checkEmailReview']);
    Route::get('/userRating/{product:user_id}', [Api\ProductController::class, 'userRating']);
    Route::get('/getAttributes/{categoryID}', [Api\ProductController::class, 'getAttributes']);
    Route::get('/getProductAttributes/{id}', [Api\ProductController::class, 'getProductAttributes']);
    Route::post('/getProd', [Api\ProductController::class, 'getProd']);
    Route::post('/getTrack', [Api\ProductController::class, 'getTrack']);
    
});

Route::group(['prefix' => '/services'], function () {
    Route::get('/search', [Api\ServiceController::class, 'search']);
    Route::get('/show/{service:guid}', [Api\ServiceController::class, 'show']);
});



Route::group(['prefix' => '/stripe', ['middleware' => 'auth:api']], function () {
    Route::get('/generate/{product:guid}/{price}', [Api\StripeController::class, 'generate']);
    Route::get('/feature', [Api\StripeController::class, 'feature']);
    Route::get('/hire', [Api\StripeController::class, 'hire']);
});
Route::group(['prefix' => '/location'], function () {
    Route::post('/getCityStatebyPostal/{zipcode}', [Api\CityStateController::class, 'getCityStatebyPostal']);
});
// Route::get('usps', [\Api\USPSController::class, 'rate']);
Route::get('products', [Api\ProductController::class, 'index']);
Route::get('products/related/{guid}', [Api\ProductController::class, 'getRelated']);
Route::get('getFourproducts', [Api\ProductController::class, 'getFour']);
Route::get('getFeatured', [Api\ProductController::class, 'getFeatured']);
Route::get('getAllFeatured', [Api\ProductController::class, 'getAllFeatured']);

Route::get('services', [Api\ServiceController::class, 'index']);
Route::post('forgot-password', [Api\Auth\ForgotPasswordController::class, 'check']);
Route::post('verify/otp', [Api\Auth\ForgotPasswordController::class, 'verifyOtp']);
Route::post('register/verify/otp', [Api\Auth\RegisterController::class, 'verifyOtp']);
Route::post('password/reset', [Api\Auth\ResetPasswordController::class, 'reset']);
Route::post('refund', [Api\RefundController::class, 'store']);
Route::patch('refund/{id}/{status}', [Api\RefundController::class, 'update']);
Route::get('city', [Api\CityStateController::class, 'index']);
Route::get('state', [Api\CityStateController::class, 'getState']);
//Subscription
Route::group(['prefix' => '/subscription'], function () {
    Route::post('/store', [Api\SubscriptionController::class, 'store']);
    Route::get('/', [Api\SubscriptionController::class, 'index']);
});
//for testing get Saved Products
Route::get('getSaved/{id}', [Api\ProductController::class, 'getSaved_']);
//Comments => Later in Auth after testing

Route::group(['prefix' => '/comments'], function () {
    Route::post('/', [Api\CommentsController::class, 'store']);
    Route::get('/', [Api\CommentsController::class, 'index']);
});

Route::group(['prefix' => '/cupons'], function () {
    Route::post('/', [Api\CuponController::class, 'store']);
    Route::get('/', [Api\CuponController::class, 'index']);
    Route::get('/show/{id}', [Api\CuponController::class, 'show']);

});

Route::group(['prefix' => '/userCupons'], function () {
    Route::post('/', [Api\UserCuponController::class, 'store']);
    Route::get('/', [Api\UserCuponController::class, 'index']);
    Route::get('/show/{id}', [Api\UserCuponController::class, 'show']);
    Route::get('/count', [Api\UserCuponController::class, 'count']);
});


Route::group(['prefix' => '/subscriptions'], function () {
    Route::post('/store', [Api\SubscriptionController::class, 'store']);
    Route::get('/', [Api\SubscriptionsController::class, 'index']);
});

Route::group(['prefix' => '/paypal'],function(){
    Route::get('/payments', [Api\PaypalController::class, 'payments']);
    Route::post('/authorized', [Api\PaypalController::class, 'authorized']);
});
Route::middleware(['cors'])->group(function () {
    Route::group(['prefix' => '/categories'], function () {
    Route::get('/', [Api\CategoryController::class, 'index']);
});
});
Route::group(['prefix' => '/categories'], function () {
    Route::get('/', [Api\CategoryController::class, 'index']);
});
Route::get('/categoryproduct', [Api\CategoryController::class, 'categoryActiveProduct']);
Route::group(['prefix' => '/productAttributes'], function () {
    Route::get('/getAttributes', [Api\ProductsAttributeController::class, 'index']);
    Route::get('/self/{guid}', [Api\ProductsAttributeController::class, 'self']);
});

Route::post('/register', [Api\Auth\RegisterController::class, 'register']);
