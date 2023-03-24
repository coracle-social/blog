Title: What Nostr is Bad At
Date: 2023-03-10 17:35
Category: Trade-offs

Nostr is an amazingly versatile protocol, and has huge potential to solve a number of real world problems. But it isn't a silver bullet, and I think it'll be interesting to watch as the Nostr ecosystem develops and discovers problems that Nostr can't solve, and which complementary technologies fill those gaps.

For the record, I have no problem with people building crazy things on Nostr - hackers are going to hack, and it's more important to stretch the protocol than to nitpick. But I'm going to nitpick anyway.

You may already be familiar with the CAP theorem. If not, it's the idea that any distributed data store can only provide two of the three following guarantees:

- Consistency - every read receives the most recent write or an error.
- Availability - every request receives a (non-error) response, without the guarantee that it contains the most recent write.
- Partition tolerance - the system continues to operate despite an arbitrary number of messages being dropped (or delayed) by the network between nodes.

The Nostr protocol describes a distributed system that stores data, and this distributed database is no exception to these rules. I'll give you three guesses which guarantee Nostr doesn't provide, and the first two don't count.

In case you need a hint though, it's consistency. Nostr optimizes for censorship resistance (availability) and redundancy (partition tolerance) at the expense of consistency.

We've already seen this problem pop up in a number of places, particularly with contact and relay lists. And that's despite an exceptionally low level of contention over the data - only a handful of different devices or clients run by a single person are touching the data.

This extreme trade-off works great for certain use cases, social media being the most evident. There are very few times when you would need to know all the replies or reactions to a given nost (although you might find it difficult to trust poll results as anything other than a random sample or respondents).

This trade-off becomes more problematic any time there is contention over whatever the Nostr event is meant to represent. In other words, if something needs to be "locked", you need consistency, and therefore you're going to find it very hard to do over Nostr.

One example is marketplaces. Nostr can be a great way to _publish_ an ecommerce listing, but actually brokering the sale in such a way that two people don't end up paying for a single item will require more back and forth to manually confirm a transaction than alternative database models might require.

Another is source control. As I understand it Jack hasn't proposed implementing git on Nostr, just an issue tracking and pull request system. But the lack of consistency at the datbase level remains a serious problem for coming to consensus on changes, fetching the latest state of the repository, or avoiding duplicate work.

There is one way to sidestep this limitation though, even staying within the Nostr protocol. By trading availability and partition tolerance away, you can gain some level of consistency. The Nostr network as a whole is a single database with availability and consistency, but select a single relay and you get a single database with different characteristics. What's even more cool is that this single database, depending on implementation, can exhibit any combination of CAP guarantees. A postgres-backed relay will work differently than one backed by DynamoDB.

The implicit tradeoff here is of course one of trust - you're now entrusting all your data to a single service provider, just like we conventionally do today. But one further tactic can mitigate this risk. If your application can be broken down into multiple chunks, each of which must be internally consistent, but which don't need to coordinate with each other, you can store _each chunk_ on a different relay. This gives you availability and partition tolerance for your use case as a whole, but consistency for each chunk.

This creates a possible solution to the two examples above. Instead of trying to broker all transactions on many relays simultaneously, or brokering all transactions on a single, centralized relay, you can broker _each_ transaction on a different relay. If a relay then goes down, or censors you, they can take some listings with them, but not all your listings. In practice, trading a little bit of censorship resistance for good consistency guarantees can be a good trade.

Likewise, a repository might be stored on a single relay, with backups, and each pull request or issue can live on a separate relay. If a relay takes down a PR, only that PR is lost, not the entire repository. Of course, having some archival relays in the mix as well makes sense for this use case because it's so long-lived.

I think thinking of Nostr as a database is fascinating. And because databases are so well-understood, hopefully this paradigm can be helpful for continuing to develop an understanding of what Nostr is good for - and what it's not.
