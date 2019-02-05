/**
 * Register Account Transaction
 * @param {bc.dotpay.ewallet.RegisterAccount} data
 * @transaction
 */
async function RegisterAccount(data) {
      NS = 'bc.dotpay.ewallet';
      factory = getFactory();

      var walletRegistry = await getAssetRegistry("bc.dotpay.ewallet.Wallet")
      var wallet_ID = data.first_name.slice(0, 1) + data.last_name.slice(0, 1) + data.date_of_birth.slice(4, 10);
      var wallet = factory.newResource(NS, 'Wallet', wallet_ID)
      wallet.wallet_friendly_name = data.wallet_friendly_name;
      wallet.transaction_History = [];
      wallet.total_amount = 0;
      var user_ID = data.first_name.slice(0, 1) + data.last_name.slice(0, 1) + data.mobile_phone;
      wallet.user_ID = user_ID; 
      
      var participantRegistry = await getParticipantRegistry("bc.dotpay.ewallet.User");
      var participant = factory.newResource("bc.dotpay.ewallet", "User", user_ID);
      participant.first_name = data.first_name;
      participant.middle_name = data.middle_name;
      participant.last_name = data.last_name;
      participant.wallet_friendly_name = data.wallet_friendly_name;
      participant.home_phone = data.home_phone;
      participant.mobile_phone = data.mobile_phone;
      participant.email = data.email;
      participant.date_of_birth = data.date_of_birth;
      participant.ktp_ID = data.ktp_ID;
      participant.sim_ID = data.sim_ID;
      participant.bank_profile = [];
      participant.friend_and_family = [];

      
      var bank = factory.newConcept(NS, 'Bank_profile')
      bank.bank_name = data.bank_name;
      bank.account_number = data.account_number;
      bank.branch_address = data.branch_address;
      
      participant.bank_profile.push(bank);
      
      await participantRegistry.add(participant)
      return walletRegistry.add(wallet)
}

/**
 * Add Friends And Family Transaction
 * @param {bc.dotpay.ewallet.AddFriendsAndFamily} data
 * @transaction
 */
async function AddFriendsAndFamily(data) {
      NS = 'bc.dotpay.ewallet';
      factory = getFactory();
      var participantRegistry = await getParticipantRegistry('bc.dotpay.ewallet.User');
      var participant = await participantRegistry.get(data.user_ID.$identifier);

      var newFriendORFamily = factory.newConcept(NS, 'Friend_and_family');
      newFriendORFamily.first_name = data.first_name;
      newFriendORFamily.middle_name = data.middle_name;
      newFriendORFamily.last_name = data.last_name;
      newFriendORFamily.mobile_phone = data.mobile_phone;
      newFriendORFamily.email = data.email;
      newFriendORFamily.date_of_birth = data.date_of_birth;
      newFriendORFamily.relation = data.relation;

      participant.friend_and_family.push(newFriendORFamily);

      return participantRegistry.update(participant);

}

/**
 * Register Account Transaction
 * @param {bc.dotpay.ewallet.RechargeWallet} data
 * @transaction
 */
async function RechargeWallet(data) {
      NS = 'bc.dotpay.ewallet';
      factory = getFactory();
      var walletRegistry = await getAssetRegistry("bc.dotpay.ewallet.Wallet")
      var wallet = await walletRegistry.get(data.wallet.$identifier)

      var addTransaction = factory.newConcept(NS, 'Transaction_History');
      addTransaction.date = new Date();
     // DOubt
      addTransaction.from = "Admin";
      
      addTransaction.to = data.wallet;
      addTransaction.type = "Recharge";
      addTransaction.amount_balance = data.amount;
      addTransaction.comment = data.comment;
      wallet.transaction_History.push(addTransaction);

      wallet.total_amount = wallet.total_amount + data.amount;

      return walletRegistry.update(wallet)
}

/**
 * Transfer Account Transaction
 * @param {bc.dotpay.ewallet.TransferAmount} data
 * @transaction
 */
async function TransferAmount(data) {
      NS = 'bc.dotpay.ewallet';
      factory = getFactory();
      var walletRegistry = await getAssetRegistry("bc.dotpay.ewallet.Wallet")
      var wallet = await walletRegistry.get(data.from.$identifier)
      var wallet1 = await walletRegistry.get(data.to.$identifier);

      var newData = factory.newConcept(NS, 'Transaction_History');
      // var  newData= wallet.transaction_History;
      newData.date = new Date();
      newData.from = data.from;
      newData.to = data.to;
      newData.type = 'Debit';
      newData.amount_balance = data.amount;
      newData.comment = data.comment;
      wallet.total_amount = wallet.total_amount - data.amount;
      newData.left_amount = wallet.total_amount;
      wallet.transaction_History.push(newData);

      if (wallet.total_amount < data.amount) {
            throw new Error(`You don't have that much amount, your total balance is ${wallet.total_amount}`)
      }


      await walletRegistry.update(wallet)

      var newBata = factory.newConcept(NS, 'Transaction_History');
      newBata.date = new Date();
      newBata.from = data.from;
      newBata.to = data.to;
      newBata.type = 'Credit';
      newBata.amount_balance = data.amount;
      newBata.comment = data.comment;
      wallet1.total_amount = wallet1.total_amount + data.amount;
      newBata.left_amount = wallet1.total_amount;
      wallet1.transaction_History.push(newBata);

      return walletRegistry.update(wallet1);

}

/**
 * Add Bank Account Transaction
 * @param {bc.dotpay.ewallet.AddMoreBankAcount} data
 * @transaction
 */
async function AddMoreBankAcount(data) {
      NS = 'bc.dotpay.ewallet';
      factory = getFactory();
      var participantRegistry = await getParticipantRegistry("bc.dotpay.ewallet.User");
      var participant = await participantRegistry.get(data.user_ID.$identifier);

      var addBankAccount = factory.newConcept(NS, "Bank_profile");
      addBankAccount.bank_name = data.bank_name;
      addBankAccount.account_number = data.account_number;
      addBankAccount.branch_address = data.branch_address;

      participant.bank_profile.push(addBankAccount);

      return participantRegistry.update(participant)
}