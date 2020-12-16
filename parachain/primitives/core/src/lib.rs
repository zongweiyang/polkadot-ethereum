//! # Core
//!
//! Common traits and types

#![allow(dead_code)]
#![allow(unused_variables)]
#![cfg_attr(not(feature = "std"), no_std)]

use frame_support::dispatch::{DispatchError, DispatchResult};

use sp_std::prelude::*;
use sp_core::H160;

pub mod types;

pub use types::{
	AppId,
	Message,
	VerificationInput,
	VerificationOutput,
	BridgedAssetId
};

/// A trait for verifying messages.
///
/// This trait should be implemented by runtime modules that wish to provide message verification functionality.
pub trait Verifier<AccountId> {

	fn verify(sender: AccountId, app_id: AppId, message: &Message) -> Result<VerificationOutput, DispatchError>;
}

/// A trait for handling message payloads.
///
/// This trait should be implemented by runtime modules that wish to handle message payloads.
pub trait Application {

	/// Handle a message payload
	fn handle(payload: &[u8], verification_output: &VerificationOutput) -> DispatchResult;

	fn address() -> H160;
}

pub trait Commitments {

	fn add(address: H160, payload: Vec<u8>);
}
