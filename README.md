# wallet
These are the when you are using Composer Playground: 

## RegisterAccount:

{ "$class": "bc.dotpay.ewallet.RegisterAccount", "first_name": "Yo", "middle_name": "", "last_name": "LO", "wallet_friendly_name": "yolo", "home_phone": "", "mobile_phone": "9878918191", "email": "yolo@gmail.com", "date_of_birth": "12/12/1989", "ktp_ID": "123123123123123123123", "sim_ID": "", "bank_name": "asd", "account_number": "asd", "branch_address": "asd" }

## Add Friends and family

{
  "$class": "bc.dotpay.ewallet.AddFriendsAndFamily",
  "user_ID": "resource:bc.dotpay.ewallet.User#YL9878918191",
  "first_name": "zo",
  "middle_name": "",
  "last_name": "lo",
  "mobile_phone": "123121212",
  "email": "123@gmail.com",
  "date_of_birth": "12/12/1891",
  "relation": "bruaahhh"
}

## ADD Bank Account

{
  "$class": "bc.dotpay.ewallet.AddMoreBankAcount",
  "user_ID": "resource:bc.dotpay.ewallet.User#YL9878918191",
  "bank_name": "122",
  "account_number": "122",
  "branch_address": "1212"
}
