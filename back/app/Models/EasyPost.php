<?php

namespace App\Models;

use App\Helpers\HttpHelper;
use Google\Service\CloudTasks\HttpRequest;
use Google\Service\Docs\Request;
use Symfony\Component\HttpKernel\Exception\HttpException;
use EasyPost\EasyPostClient;
class EasyPost
{
    //Test: https://apis-sandbox.fedex.com/
    //Production: https://apis.fedex.com/
    const API = 'https://api.easypost.com';
    
    public static function authorize()
    {
        $url = self::API . '/oauth/token';
        $headers = ['Content-Type' => 'application/x-www-form-urlencoded'];
        $body = [
            'grant_type' => 'client_credentials',
            'client_id' => 'EZTKaa43ba80e75d43fcbfc80f91c5bb3f698aOXT1RA0DlkGSenV1LkXw',//env('FEDEX_API_KEY'),
            // 'client_secret' => 'bc0b0ed468e640c8a26ac3ce3959a93c'//env('FEDEX_SECRET_KEY'),
        ];
        return HttpHelper::request($url, $body, 'POST', $headers);
    }
    public static function verifyAddress__(/*string $token,*/ $data) 
      {
        // $data
        $data = '{
          "address": {
            "street1": "'. $data['street_address'] .'",
            "street2": "",
            "city": "'. $data['city'] .'",
            "state": "'. $data['state'] .'",
            "zip": "'. $data['zip'] .'",
            "country": "US",
            "company": "EasyPost",
            "phone": "415-123-4567"
          },
          "verify": true
        }';
        if(!empty($data)){
          $url = self::API . '/v2/addresses';
  
          $token = self::authorize();
          
          $headers = array();
  
          $headers[] = 'Content-Type: application/json';
          // $headers[] = 'Authorization: Bearer '. $token["access_token"];
          // $headers[] = 'X-locale: en_US';
          
          return HttpHelper::request($url, $data, 'POST', $headers, true);
        }
      }
    public static function verifyAddress($data){
        try{
          // $client = new EasyPostClient(getenv('EASYPOST_API_KEY'));

          // $address = $client->address->create([
          //     // 'verify_strict'  => true,
          //     'street1' => $data['street_address'],
          //     'street2' => '',
          //     'city'    => $data['city'],
          //     'state'   => $data['state'],
          //     'zip'     => $data['zip'],
          //     'country' => 'US',
          //     'company' => '',
          //     'phone'   => '415-123-4567'
          // ]);
          // $verifiedAddress = $client->address->verify($address->id);
          
          // return $verifiedAddress;
          //return
          // Generated by curl-to-PHP: http://incarnate.github.io/curl-to-php/
          $data = '{
            "address": {
              "street1": "'. $data['street_address'] .'",
              "street2": "",
              "city": "'. $data['city'] .'",
              "state": "'. $data['state'] .'",
              "zip": "'. $data['zip'] .'",
              "country": "US",
              "company": "Zecodo",
              "phone": "415-123-4567"
            },
            "verify": true
          }';
        $ch = curl_init();

        curl_setopt($ch, CURLOPT_URL, 'https://api.easypost.com/v2/addresses');
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
        curl_setopt($ch, CURLOPT_POST, 1);
        curl_setopt($ch, CURLOPT_POSTFIELDS,  $data);//"{\n    \"address\": {\n      \"street1\": \"417 MONTGOMERY ST\",\n      \"street2\": \"FLOOR 5\",\n      \"city\": \"SAN FRANCISCO\",\n      \"state\": \"CA\",\n      \"zip\": \"94104\",\n      \"country\": \"US\",\n      \"company\": \"EasyPost\",\n      \"phone\": \"415-123-4567\"\n    },\n    \"verify\": true\n  }");
        curl_setopt($ch, CURLOPT_USERPWD, $_ENV["EASYPOST_API_KEY"] . ':' . '');

        $headers = array();
        $headers[] = 'Content-Type: application/json';
        curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);

        $result = curl_exec($ch);
        if (curl_errno($ch)) {
            echo 'Error:' . curl_error($ch);
        }
        curl_close($ch);
        return $result;
        //return
        }catch(\Exception $e)
        {
          throw $e;
        }
    }
    public static function createShipment($data){
      try{
          // $client = new \EasyPost\EasyPostClient(getenv('EASYPOST_API_KEY'));
          // //Carrier Accoount id = ca_a806e7e93f354e80bdb09a3bfc4b2009
          
          //     $shipment = $client->shipment->create($data);
          //     $shipments = $client->shipment->retrieve($shipment->id);
          //     $boughtShipment = $client->shipment->buy(
          //         $shipments->id,
          //         [
          //             'rate'      => $shipments->lowestRate(),
          //             // 'insurance' => 249.99
          //         ]
          //     );
          //     $shipmentWithLabel = $client->shipment->label(
          //         $shipments->id,
          //         ['file_format' => 'PDF']
          //     );
          // return $shipmentWithLabel;
          // Generated by curl-to-PHP: http://incarnate.github.io/curl-to-php/
                //   $req = array(
                //       'shipment' => array(
                //           'from_address' => array(
                //               "name" =>"EasyPost",
                //               "street1" => "417 Montgomery Street",
                //               "street2" => "5th Floor",
                //               "city" => "San Francisco",
                //               "state" => "CA",
                //               "zip" => "94104",
                //               "country" => "US",
                //               "phone" => "4153334445",
                //               "email" => "support@easypost.com"
                //           ),
                //         'to_address' => array(
                //               "name" => "Dr. Steve Brule",
                //               "street1" => "179 N Harbor Dr",
                //               "city" => "Redondo Beach",
                //               "state" => "CA",
                //               "zip" => "90277",
                //               "country" => "US",
                //               "phone" => "8573875756",
                //               "email" => "dr_steve_brule@gmail.com"
                //             ),
                //             // "shipDatestamp" => Carbon::today()->format('Y-m-d'),
                //         'parcel' => array(
                //               "length" => "20.2",
                //               "width" => "10.9",
                //               "height" => "5",
                //               "weight" => "65.9"
                //         ),
                //       )
                // );
                

              $ch = curl_init();
              curl_setopt($ch, CURLOPT_URL, 'https://api.easypost.com/v2/shipments');
              curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
              curl_setopt($ch, CURLOPT_POST, 1);
              curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($data));//"{\n    \"shipment\": {\n      \"to_address\": {\n        \"name\": \"Dr. Steve Brule\",\n        \"street1\": \"179 N Harbor Dr\",\n        \"city\": \"Redondo Beach\",\n        \"state\": \"CA\",\n        \"zip\": \"90277\",\n        \"country\": \"US\",\n        \"phone\": \"8573875756\",\n        \"email\": \"dr_steve_brule@gmail.com\"\n      },\n      \"from_address\": {\n        \"name\": \"EasyPost\",\n        \"street1\": \"417 Montgomery Street\",\n        \"street2\": \"5th Floor\",\n        \"city\": \"San Francisco\",\n        \"state\": \"CA\",\n        \"zip\": \"94104\",\n        \"country\": \"US\",\n        \"phone\": \"4153334445\",\n        \"email\": \"support@easypost.com\"\n      },\n      \"parcel\": {\n        \"length\": \"20.2\",\n        \"width\": \"10.9\",\n        \"height\": \"5\",\n        \"weight\": \"65.9\"\n      },\n      \"customs_info\": {\n        \"id\": \"cstinfo_...\"\n      }\n    }\n  }");
              curl_setopt($ch, CURLOPT_USERPWD, $_ENV["EASYPOST_API_KEY"] . ':' . '');

              $headers = array();
              $headers[] = 'Content-Type: application/json';
              curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);

              $result = curl_exec($ch);
              if (curl_errno($ch)) {
                  echo 'Error:' . curl_error($ch);
              }
              curl_close($ch);
               $rates = json_decode($result)->rates;
              $rateArray = [];
              // foreach( $rates as $key => $element) {
              //     $rateArray['id'] = $element->id;
              //     array_push($rateArray, $element->rate);
              // }
              foreach ( $rates as $key => $value )
              {
                $rateArray[$key]= $value->rate;
              }
             
              $rate_selected = min($rateArray);
              $minrate_selected = "";
              foreach($rates as $srates){
                if($srates->rate == $rate_selected){
                  $minrate_selected_id =$srates;
                }
              }
              $ch_bought = curl_init();
              //Object for Rates
              $rate_obj = '{
                "rate": {
                  "id": $rate_selected->id
                }
              }';
              curl_setopt($ch_bought, CURLOPT_URL, 'https://api.easypost.com/v2/shipments/'.json_decode($result)->id.'/buy');
              curl_setopt($ch_bought, CURLOPT_RETURNTRANSFER, 1);
              curl_setopt($ch_bought, CURLOPT_POST, 1);
              curl_setopt($ch_bought, CURLOPT_POSTFIELDS, "{\n    \"rate\": {\n      \"id\": \"". $minrate_selected_id->id."\"\n    },\n    \"insurance\": \"0.00\"\n  }");
              curl_setopt($ch_bought, CURLOPT_USERPWD, $_ENV["EASYPOST_API_KEY"] . ':' . '');

              $headers_bought = array();
              $headers_bought[] = 'Content-Type: application/json';
              curl_setopt($ch_bought, CURLOPT_HTTPHEADER, $headers_bought);

              $result_bought = curl_exec($ch_bought);
              if (curl_errno($ch_bought)) {
                  echo 'Error:' . curl_error($ch_bought);
              }
              curl_close($ch_bought);
              // return $result;
              
             
              return $result_bought;
                
        }catch(\Exception $e)
        {
          throw $e;
        }
    }
    public static function trackShipment($data){
      try{
          // $client = new \EasyPost\EasyPostClient(getenv('EASYPOST_API_KEY'));

          // $tracker = $client->tracker->create([
          //     'tracking_code' => $data,
          //     'carrier' => 'USPS'
          // ]);
          // Generated by curl-to-PHP: http://incarnate.github.io/curl-to-php/
        $ch = curl_init();
            // $data = 'EZ4000000004';
            // For Testing
            // EZ1000000001	pre_transit
            // EZ2000000002	in_transit
            // EZ3000000003	out_for_delivery
            // EZ4000000004	delivered
            // EZ5000000005	return_to_sender
            // EZ6000000006	failure
            // EZ7000000007	unknown

        curl_setopt($ch, CURLOPT_URL, 'https://api.easypost.com/v2/trackers');
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
        curl_setopt($ch, CURLOPT_POST, 1);
        curl_setopt($ch, CURLOPT_POSTFIELDS, "{\n    \"tracker\": {\n      \"tracking_code\": \"$data\",\n      \"carrier\": \"USPS\"\n    }\n  }");
        curl_setopt($ch, CURLOPT_USERPWD, $_ENV["EASYPOST_API_KEY"] . ':' . '');

        $headers = array();
        $headers[] = 'Content-Type: application/json';
        curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);

        $tracker = curl_exec($ch);
        if (curl_errno($ch)) {
            echo 'Error:' . curl_error($ch);
        }
        curl_close($ch);

        return $tracker;
      }catch(\Exception $e)
      {
        throw $e;
      }
    }
    public static function shipmentRates($data){
        
//ca_a806e7e93f354e80bdb09a3bfc4b2009
        // $req = array(
        //         'shipment' => array(
        //             'from_address' => array(
        //                 "name" =>"EasyPost",
        //                 "street1" => "417 Montgomery Street",
        //                 "street2" => "5th Floor",
        //                 "city" => "San Francisco",
        //                 "state" => "CA",
        //                 "zip" => "94104",
        //                 "country" => "US",
        //                 "phone" => "4153334445",
        //                 "email" => "support@easypost.com"
        //             ),
        //           'to_address' => array(
        //                 "name" => "Dr. Steve Brule",
        //                 "street1" => "179 N Harbor Dr",
        //                 "city" => "Redondo Beach",
        //                 "state" => "CA",
        //                 "zip" => "90277",
        //                 "country" => "US",
        //                 "phone" => "8573875756",
        //                 "email" => "dr_steve_brule@gmail.com"
        //               ),
        //               // "shipDatestamp" => Carbon::today()->format('Y-m-d'),
        //           'parcel' => array(
        //                 "length" => "20.2",
        //                 "width" => "10.9",
        //                 "height" => "5",
        //                 "weight" => "65.9"
        //           ),
        //         )
        //   );
    
          $ch = curl_init();

          curl_setopt($ch, CURLOPT_URL, 'https://api.easypost.com/beta/rates');
          curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
          curl_setopt($ch, CURLOPT_POST, 1);
          curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($data));// "{\n  \"shipment\": {\n    \"to_address\": {\n      \"name\": \"Dr. Steve Brule\",\n      \"street1\": \"179 N Harbor Dr\",\n      \"city\": \"Redondo Beach\",\n      \"state\": \"CA\",\n      \"zip\": \"90277\",\n      \"country\": \"US\",\n      \"phone\": \"8573875756\",\n      \"email\": \"dr_steve_brule@gmail.com\",\n    },\n    \"from_address\": {\n      \"name\": \"EasyPost\",\n      \"street1\": \"417 Montgomery Street\",\n      \"street2\": \"5th Floor\",\n      \"city\": \"San Francisco\",\n      \"state\": \"CA\",\n      \"zip\": \"94104\",\n      \"country\": \"US\",\n      \"phone\": \"4153334445\",\n      \"email\": \"support@easypost.com\"\n    },\n    \"parcel\": {\n      \"length\": \"20.2\",\n      \"width\": \"10.9\",\n      \"height\": \"5\",\n      \"weight\": \"65.0\"\n    }\n  }\n}");
          curl_setopt($ch, CURLOPT_USERPWD, $_ENV["EASYPOST_API_KEY"] . ':' . '');
          
          $headers = array();
          $headers[] = 'Content-Type: application/json';
          curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
          $result = curl_exec($ch);
          // $rates = curl_exec($ch);
          if (curl_errno($ch)) {
              echo 'Error:' . curl_error($ch);
          }
          curl_close($ch);
          $rates = json_decode($result)->rates;
          $rateArray = [];
          foreach( $rates as $key => $element) {
              array_push($rateArray, $element->rate);
          }
          $rate_selected = min($rateArray);
          // return response()->json(['rate_selected' => $rate_selected, 'id' => json_decode($result) ], 200);
          return $rate_selected;
    }
    public static function buyShipment(){

        $client = new \EasyPost\EasyPostClient(getenv('EASYPOST_API_KEY'));

        $shipment = $client->shipment->retrieve('shp_f5aa50445eba481595441de6e650400f');

        $boughtShipment = $client->shipment->buy(
            $shipment->id,
            [
                'rate'      => $shipment->lowestRate(),
                'insurance' => 249.99
            ]
        );

        return $boughtShipment;
    }
    
    public static function calculateRate($data){
      
      // if(!empty($data)){
        $data = json_decode($data);
        $url = 'https://apis-sandbox.fedex.com/rate/v1/rates/quotes';//self::API . '/track/v1/trackingnumbers';  
        
        $token = self::authorize();
        
        $headers = array();

        $headers[] = 'Content-Type: application/json';
        $headers[] = 'Authorization: Bearer '. $token["access_token"];
        $headers[] = 'X-locale: en_US';
        
        return HttpHelper::request($url,$data, 'POST', $headers, true);
      // }
    }
    public static function packed(/*string $token,*/ $data) 
    {
      //dd($data);
      if(!empty($data)){
        $url = self::API . '/track/v1';

        $token = self::authorize();
        
        $headers = array();

        $headers[] = 'Content-Type: application/json';
        $headers[] = 'Authorization: Bearer '. $token["access_token"];
        $headers[] = 'X-locale: en_US';
        
        return HttpHelper::request($url, $data, 'POST', $headers, true);
      }
    }
  
    
    public static function validateShipment(string $token, array $data = []) 
    {
        $url = self::API . '/ship/v1/shipments/packages/validate';
     
        $headers = array();

        $headers[] = 'Content-Type: application/json';
        $headers[] = 'Authorization: Bearer '. $token;
        $headers[] = 'X-locale: en_US';

        return HttpHelper::request($url, $data, 'POST', $headers, true);
    }

    public static function validatePostalCode($data) 
    {
      if(!empty($data)){
     
        $data = ' {
          "carrierCode": "FDXE",
          "countryCode": "US",
          "stateOrProvinceCode": "'. $data['state'] .'",
          "postalCode": "'. $data['zip'] .'",
          "shipDate": "2023-01-05",
          "checkForMismatch": true
          }';

        $data = json_decode($data);
        $url = self::API . '/country/v1/postal/validate';

        $token = self::authorize();
        
        $headers = array();

        $headers[] = 'Content-Type: application/json';
        $headers[] = 'Authorization: Bearer '. $token["access_token"];
        $headers[] = 'X-locale: en_US';
      
        return HttpHelper::request($url, $data, 'POST', $headers, true);
      }
      
    }
   
    public static function rateCalculator($data){
        
      // https://apis-sandbox.fedex.com/rate/v1/rates/quotes
      if(!empty($data)){
      
        $recipetZip =$data['recipetZip'];
        $shipperweight =$data['shipperweight'];
        $shipperZip =$data['shipperZip'];
        
        // $recipetZip =$data[0]['shipping_detail']['zip'];
        // $shipperweight =$data[0]['product']['weight'];
        // $shipperZip =$data[0]['product']['zip'];
       
        $data ='{
          "accountNumber": {
            "value": "740561073"
          },
          "requestedShipment": {
            "shipper": {
              "address": {
                "postalCode": '. $shipperZip .',
                "countryCode": "US"
              }
            },
            "recipient": {
              "address": {
                "postalCode": '. $recipetZip .',
                "countryCode": "US"
              }
            },
            "pickupType": "USE_SCHEDULED_PICKUP",
            "rateRequestType": [
              "ACCOUNT",
              "LIST"
            ],
            "requestedPackageLineItems": [
              {
                "weight": {
                  "units": "LB",
                  "value": '. $shipperweight .'
                }
              }
            ]
          }
        }';
        $data = json_decode($data);
        $url = self::API . '/rate/v1/rates/quotes';

        $token = self::authorize();
        
        $headers = array();

        $headers[] = 'Content-Type: application/json';
        $headers[] = 'Authorization: Bearer '. $token["access_token"];
        $headers[] = 'X-locale: en_US';
      
        return HttpHelper::request($url, $data, 'POST', $headers, true);
      }
      
    } 
  /**
   * Function for Dummy PosttalCode Validation
   * 
   */
    public static function payLoadPosttalCode(){
      return '{
          "countryCode": "US",
          "stateOrProvinceCode": "MD",
          "postalCode": "2090",
          "checkForMismatch": true
        }';
    }
   /**
   * Function for Address Verifications
   * 
   */
  public static function payLoadVerifyAddress(){
    return '{
        "countryCode": "US",
        "stateOrProvinceCode": "MD",
        "postalCode": "2090",
        "checkForMismatch": true
      }';
  }
  /**
   * Function for Dummy Address Validation
   * 
   */
    public static function payLoadAddressValidate(){
     return ' {
          "inEffectAsOfTimestamp": "2022-01-03",
          "validateAddressControlParameters": {
            "includeResolutionTokens": true
          },
          "addressesToValidate": [
            {
              "address": {
                "streetLines": [
                  "9600 colesville road"
                ],
                "city": "silver spring",
                "stateOrProvinceCode": "MD",
                "postalCode": "2090",
                "countryCode": "US",
                "addressVerificationId": "string"
              }
            }
          ]
        }';
    }
  /**
   * Function for Dummy Track Rate
   * 
   */
    public static function payloadTrackRate($rate) {
      return 
          '{
            "accountNumber": {
              "value": "740561073"
            },
            "requestedShipment": {
              "shipper": {
                "address": {
                  "postalCode": 65247,
                  "countryCode": "US"
                }
              },
              "recipient": {
                "address": {
                  "postalCode": 75063,
                  "countryCode": "US"
                }
              },
              "pickupType": "USE_SCHEDULED_PICKUP",
              "rateRequestType": [
                "ACCOUNT",
                "LIST"
              ],
              "requestedPackageLineItems": [
                {
                  "weight": {
                    "units": "LB",
                    "value": 10
                  }
                }
              ]
            }
          }';
      
  }
   /**
   * Function for Dummy Track Shipment 1
   * 
   */
    public static function trackPayload($trackingNum) {
      return 
          '{
            "trackingInfo": [
              {
                "trackingNumberInfo": {
                  "trackingNumber": "'.$trackingNum.'"
                }
              }
            ],
            "includeDetailedScans": true
          }';
      
  }
  /**
   * Function for Dummy Track Shipment 2
   * 
   */
    public static function dummytrackPayload() {
      return 
          '{
            "trackingInfo": [
              {
                "trackingNumberInfo": {
                  "trackingNumber": "111111111111"
                }
              }
            ],
            "includeDetailedScans": true
          }';
      
  }
  /**
   * Function for Dummy rate Calculator
   * 
   */
  public static function payLoadrateCalculator(){
    return '{
      "accountNumber": {
        "value": "740561073"
      },
      "requestedShipment": {
        "shipper": {
          "address": {
            "postalCode": 65247,
            "countryCode": "US"
          }
        },
        "recipient": {
          "address": {
            "postalCode": 75063,
            "countryCode": "US"
          }
        },
        "pickupType": "USE_SCHEDULED_PICKUP",
        "rateRequestType": [
          "ACCOUNT",
          "LIST"
        ],
        "requestedPackageLineItems": [
          {
            "weight": {
              "units": "LB",
              "value": 10
            }
          }
        ]
      }
    }';
  }
    /**
   * Function for Dummy Create Shipment
   * 
   */

    public static function dummyPayload() {
        return [
                  // 'carrier_account_id '=> 'ca_a806e7e93f354e80bdb09a3bfc4b2009',
                  'to_address' => [
                      'name' => 'Dr. Steve Brule',
                      'street1' => '9600 colesville',
                      'city' => 'Silver Spring',
                      'state' => 'MD',
                      'zip' => '20901',
                      'country' => 'US',
                      'phone' => '3331114444',
                      'email' => 'dr_steve_brule@gmail.com'
                  ],
                  'from_address' => [
                      'name' => 'EasyPost',
                      'street1' => '8040 13th St',
                      'street2' => '5th Floor',
                      'city' => 'Silver Spring',
                      'state' => 'MD',
                      'zip' => '20910',
                      'country' => 'US',
                      'phone' => '3331114444',
                      'email' => 'support@easypost.com'
                  ],
                  'parcel' => [
                      'length' => 20.2,
                      'width' => 10.9,
                      'height' => 5,
                      'weight' => 65.9
                  ]
              ];
    }
}
