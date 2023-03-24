Title: POW and Micropayments
Date: 2023-03-24 10:08
Category: Trade-offs

Proof-of-work (POW) is not new to Nostr. Because the protocol is "Bitcoin-adjacent", there is a general familiarity with one of the precursor technologies to Bitcoin, [Hashcash](https://en.wikipedia.org/wiki/Hashcash), invented by Adam Back in 1997. Some users have mined keys with a certain number of leading zeroes, or with the first few letters of their handle in order to demonstrate skin-in-the-game, and there have even been some [nips](https://github.com/nostr-protocol/nips/blob/master/13.md) merged which take advantage of proof-of-work.

This blog post won't be new to people who have given much thought to the merits of Hashcash and proof of work, but I only recently discovered the benefits of POW against micropayments in some situations, and thought would be interesting to try to articulate.

# POW vs Micropayments

The basic idea behind using proof-of-work in a social protocol is that having work embedded in pubkeys (or event ids) demonstrates that the person publishing the information has spent a certain amount of processing power mining the information, and therefore has invested more into producing the content that would otherwise be evident.

There is, however, another way to prove your work: micropayments. Bitcoin, being the best money, is directly based on proof of work, and so payments made using Bitcoin are a way of borrowing the proof of work already invested in minting the coins. But any token that has recognized value will also work (with less fidelity) to store your labor for later use; that's just how money works.

# It's exchange of value all the way down

The advantage of using payments instead of direct computational proof of work is because the work stored in a medium of exchange is _re-usable_. When you buy something, the merchant isn't simply interested in having you prove you worked for your bread, they want to prove they worked to provide you that bread when they go on to make their own purchase. This is because a purchase is a "value exchange" - there is someone providing their own work in exchange for yours.

In theory, this is always true - there really is no free lunch. This is the case even for the most negligible use cases of proof of work, for example when mining an event id to get past spam filters. Someone somewhere is checking that zero, hosting, and transmitting that content, and wouldn't it be nice if they (or the final recipient of the note) could be compensated by receiving the value that you had to expend anyway? That way, you could simultaneously boost your reach _and_ pay people to read your content!

For this reason, I used to be against POW in any amount. Direct computational work is always wasted. That's a lot of work being destroyed instead of being used to support the people running the infrastructure. And I still think payments should be preferred wherever possible. For example, one possible alternative to proof-of-work for getting past a spam filter would be to pay relays directly, and then have those relays publish an additional proof of your payment, similar to a [zap note](https://github.com/nostr-protocol/nips/blob/master/57.md). The relays receiving your content would be paid directly, and the proof of payment would function as proof of work for all subsequent relays (or clients) receiving the event.

# Nanopayments

Of course, this only works if the price tag of publishing content is significant enough to justify the extra coordination, storage, and transmission of the payment proofs. Payments also don't make sense if there is no clear recipient, if the recipient is not yet known, or if they introduce an unacceptable amount of required trust. This is where proof-of-work shines - not as a substitute for micropayments, but as a trustless, coordination-free substitute for nanopayments, which I'll define as "any payment that costs more to process that the value it is being exchanged for". In Bitcoin-land, UTXOs that can't be included in a transaction without costing more than they yield are known as "dust".

Nonopayments never make economic sense. The most obvious being as a substitute for very small amounts of work, e.g. a single leading zero on an event id. How many fractions of a satoshi would mining one digit cost? Another nanopayment that is less obvious would be payments for very long-lived value, for example to verify a public key. In this case, even though the work isn't re-usable, it continues to have utility as long as the key is in use.

# Resource Auctions

To tie all this together, let's think about what filtering spam actually is. The problem with spam is that it unproductively consumes valuable resources - both computational and social - that legitimate content should consume instead. In other words, there is a limited amount of organic engagement available for content to attract, and spam undercuts legitimate content's bid for engagement by virtue of its lower cost to produce.

The traditional solution for solving contention over a limited resource is an auction. Each interested party makes a bid, and the highest bidder wins. The problem with auctions is that they require coordination to choose a winner, and participants usually have a clear idea of what the ultimate value of the good being sold actually is. This difficulty in both assessing and facilitating a transfer of value makes the advantages of payments irrelevant, leaving the only goal of the auction to impose a cost on all actors in order to reduce spam's cost advantage to a lower multiple. So, instead of spam being thousands of times cheaper to produce than legitimate content (1 minute of your time to compose a note at $30/hr is 50 cents!), it becomes only a few times cheaper. So even though POW is an inferior way to transfer value, its trustless nature makes it the best option in this case.

# Conclusion

That's not to say there aren't better ways to do moderation, just that direct payments to cover resource consumption aren't the correct solution. I personally think web-of-trust is the best baseline for eliminating spam, but it does need a complement in order to introduce newcomers to the network, or promote content to interested users. This can take the form of proof-of-work for lower-stakes cases, or payments as a way of borrowing reputation from someone already established in the network for cases where the goal is not to avoid spam, but to leverage reputation external to the social graph embedded in Nostr.

Distributed moderation and content recommendations is something I'm really interested in, so expect to see more thoughts on that topic from me in the future.
