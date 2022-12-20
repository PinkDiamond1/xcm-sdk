import { Keyring } from "@polkadot/keyring";
import { Provider } from "../../provider";
import { cryptoWaitReady } from "@polkadot/util-crypto";
import { rococoExampleUtils } from "./rococo-examples-utilts";

const main = async () => {
  const rpc = rococoExampleUtils.rockMineRpc;
  const destination = "Parachain";
  const destinationValue = rococoExampleUtils.daliParachainId; // dali parachain
  const destinationParents = 1;
  const beneficiary = "AccountId32";
  const beneficiaryValue = rococoExampleUtils.daliDestinationAccount;
  const assetParents = 1;
  const amount = 50000000000;

  await cryptoWaitReady();

  const keyring = new Keyring({ type: "sr25519" });
  const sender = keyring.addFromMnemonic(rococoExampleUtils.senderMnemonic);

  const provider = new Provider(rpc, sender);

  const res = await provider.limitedReserveTransferAssets({
    destination,
    destinationValue,
    destinationParents,
    beneficiary,
    beneficiaryValue,
    assetParents,
    amount,
  });

  console.log(res);
};

main().then(() => process.exit(1));

/**
 * 
pnpm ts-node src/examples/rococo/rockmine-to-dali-roc.ts 
 */
