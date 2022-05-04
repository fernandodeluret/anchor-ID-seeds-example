import * as anchor from "@project-serum/anchor";
import { Program } from "@project-serum/anchor";
import { Nuevo1 } from "../target/types/nuevo1";

describe("nuevo1", () => {
  // Configure the client to use the local cluster.
  let provider = anchor.AnchorProvider.env()
  anchor.setProvider(provider);

  const program = anchor.workspace.Nuevo1 as Program<Nuevo1>;

  it("Is initialized!", async () => {
    let param1  = new anchor.BN(30)
    const tx = await program.methods.initialize(param1).accounts({admin: provider.wallet.publicKey}).rpc();
    console.log("Your transaction signature", tx);

    let [pub1] = await anchor.web3.PublicKey.findProgramAddress(
      [
        Buffer.from("STR"), 
        param1.toArrayLike(Buffer,"le", 8), 
        provider.wallet.publicKey.toBuffer()
      ], 
      program.programId);

    let [pub2] = await anchor.web3.PublicKey.findProgramAddress(
      [
        Buffer.from("STR"), 
        param1.toBuffer("le", 8), 
        provider.wallet.publicKey.toBuffer()
      ], 
      program.programId);
    
    console.log("pub1", pub1.toBase58())
    console.log("pub2", pub2.toBase58())
  });
});
