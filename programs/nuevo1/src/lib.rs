use anchor_lang::prelude::*;

declare_id!("Fg6PaFpoGXkYsidMpWTK6W2BeZ7FEfcYkg476zPFsLnS");

const STR1: &str = "STR";


#[program]
pub mod nuevo1 {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>, param1: u64) -> Result<()> {
        let key1 = ctx.accounts.account1.key();
        msg!("{:?}", key1);

        Ok(())
    }
}

#[derive(Accounts)]
#[instruction(param1: u64)]
pub struct Initialize<'info> {
    #[account(mut)]
    pub admin: Signer<'info>,

    #[account(
        init,
        payer = admin,
        seeds = [
            STR1.as_bytes(),
            &param1.to_le_bytes(),
            admin.key().as_ref()
        ],
        bump,
        space = 30
    )]
    pub account1: Account<'info, Account1>,

    pub system_program: Program<'info, System>,
}


#[account]
pub struct Account1 {
    pub bump: u8
}