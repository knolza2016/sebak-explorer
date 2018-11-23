import Transactions from "./pages/Transactions";
import Account from "./pages/Account";

const routes = [{
  path: "/transactions",
  component: Transactions
}, {
  path: "/accounts/:publicKey",
  component: Account
}];

export default routes;
