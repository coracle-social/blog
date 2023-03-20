Title: A Vision for Nostr
Date: 2023-03-17 10:47
Category: Vision

"What is Nostr?" is a hard question to answer. But an even more difficult one is "what should Nostr be?" Set aside the fact that "other stuff" is making up an ever-growing share of Nostr applications, even the social media use case on its own is a fractal of a problem.

What's encouraging though, is that despite the complexity of "social media", there is a surprising level of consensus on what needs to be done - within the Nostr developer community, differences are characterized more by emphasis than by direction.

# Staying on mission

Instead of focusing on "problems to be solved" within the current system (e.g. content monetization or data harvesting), people who "get" nostr have made its core principles their own. Because these principles radically differ from the way things are done in centralized systems, they spawn a complex system of new affordances and limitations.

If I had to sum up what the core principle of Nostr is, I would say "individual sovereignty". Nostr is a social experiment that asks people to take responsibility for what they say (and sell, host, publish, promote). This topic has been explored ad nauseum by [better writers than I](https://dergigi.com/2019/08/22/the-rise-of-the-sovereign-individual/) using Bitcoin as a vehicle, so I'll avoid re-treading the same ground if I can, except to point out that the two key design decisions of the Nostr protocol, self-custody of keys and hosting spread across multiple relays, simultaneously entrust control to users and revoke certain entitlements users are accustomed to.

It's well- (maybe even over-) understood what the risks and benefits are of holding your own keys. And being able to either select or host your own relays, each with different purposes and characteristics, gives individuals a level of control over his own publishing platform precedented only by the World Wide Web itself.

# Lies they tell

But there are a lot of things users lose when moving away from a centralized platform. The ability to edit, delete, block, and promote content are not what I'm talking about - the guarantees for being able to do these things on Nostr are weaker, but as long as someone can take a screenshot of your Tweet, or block Google's ads, or log in with a different account, the affordances provided by centralized platforms are conveniences at best, and illusory at worst - that is, unless we go full digital panopticon, with universal biometric authentication and DRM for our brains.

What is more interesting to me is how centralized social media platforms lie about what they essentially are. Twitter's motto is "what’s happening", and their [about page](https://about.twitter.com/en) features a tweet encouraging others to "Speak the truth, even if your voice shakes." And yet over the last several years they have censored real news, promoted propaganda, and shadow banned those whose "voice shakes". Musk's desperate claims that "we'll stop, I promise" don't negate the fact that Twitter retains control over users' speech in a way that is inherently in conflict with their stated mission.

This is true even of non-political speech, because it is in Twitter's interest to promote content that drives engagement, because engagement is what in turn drives advertising profits. This undermines their claim of user enfranchisement - they exercise partiality in choosing whose voice gets a megaphone.

Users of Nostr know the feeling of this weight being lifted. Nostr is anything but polished, but that's part of the charm - you know there is no one scanning your content, deciding who sees what and with what "added context". Many users including myself have experienced a 10x or more increase in engagement, despite a much smaller number of people on the platform. This is of course likely due not only to the lack of an algorithm, but also to the lack of celebrities, which tend to absorb attention, leaving little for the rest of us. But for now, Nostr is for the plebs.

# Cutting the Gordian Knot

And I hope, and have reason, that it will continue to be so. When I spoke to my pastor prior to moving to Austin to work on Coracle full-time, I asked him what problems related to social media he would like to see solved. He said that he would like to see a solution that puts users in control of their algorithm, and allows individuals to broadcast their content to as wide an audience as possible.

There is a contradiction here, and the claim that it can be solved is one of the main lies that centralized platforms like to tell. You are free to broadcast your data as widely as you want, but no one is obligated to read it. Twitter tries to square the circle by artificially reversing this trade-off, resulting in a system where "you can't broadcast your data unless we want to force people to read it." But even they can't give their users control while simultaneously taking it away.

There is a path forward though, and now we finally get to the point of this post. Nostr is so revolutionary because it puts "digital localism" within reach. I had better define my terms here, since "digital localism" is used to describe a lot of dystopian ideas I'm not very excited about. What I mean by the term is something like "social relevance". Contra the egalitarians, there are real differences that exist to set groups of people apart. Things like topical interest, physical geography, professional network, religious belief, and yes, ethnicity and sex.

# What is a community anyway

The fact that digital "communties" exist is something that to their credit Mastodon recognized, and sought to accommodate. But they missed the fact that humanity is partitioned into a nearly infinite number of overlapping sub-groups based on a nearly infinite number of dimensions. Yes, maybe I should be friends with you because you also like cats, but let's refine this further, do you think cilantro tastes like soap, are you a member of the Church of Satan, are you Italian, have you been reading Hayak lately, do you like watching Hallmark movies, English, do you speak it? Partitioning people into groups based on a single dimension is an exercise in futility, and is the reason Mastodon instances are either ghost towns or home to millions of users.

By allowing users to download/host their own data and join as many and whichever relays they choose based on arbitrary criteria, people are now able to co-locate in digital space, and interact with each instance in a different way. This is why I'm not excited about tools that spray your data to as many relays as possible. This only serves to maintain the illusion that replicating all content across every instance can scale, and it can't.

Instead, relays should differentiate, both in terms of function and membership. In the future (and even now) there will be closed archival relays that scrape the network and provide a backup of user data for a fee; public-read, private-write relays that allow members to participate in an exclusive group with greater reach; private-read, private-write closed community relays; public "town square" relays, paid relays that provide indexes, full-text search, or content recommendations for the wider network (or a relevant subset of it); and relays that provide oracles for data external to nostr. The ability of users to pick and choose which relays to connect to (and to multiplex those connections through yet another proxy/aggregator relay) allows them to define their own low-granularity social graph, refining it further with follows, mutes, and other "algorithmic" tools.

The same is true of client implementations. Many people building social media platforms want to "fix Twitter". But that vision of digital society is amazingly narrow (luckily, Nostr developers don't seem to suffer from the same kind of myopia). _Most_ people I know don't have Twitter accounts, or use them. For them, Twitter is about as relevant to their lives as CNN. Instead, they use private Facebook groups to arrange babysitters for their kids, or Cragislist to buy and sell local goods. They use Google maps to find reviews for nearby businesses, and the church email list to keep up with prayer requests. They subscribe to newsletters their friends publish, and spend their days at work sending memes over Slack. The common theme here is that all these platforms connect "us" with "mine", not with "them". And yes, journalism and topical interest ala Reddit is a part of this, but for normal people, a vanishingly small part. But let's stop squawking about "echo chambers".

And Nostr, [despite its limitations](https://blog.coracle.social/what-nostr-is-bad-at.html), can be applied to every use case enumerated above. In so doing, it will free regular people from the constraining force of opinionated, artificial, centralized communication platforms, and allow them to build a digital social network that complements real life.

# Conclusion

The driving force, for me, is not to erase our differences and create an egalitarian utopia, or stick it to big tech, or to make money, but to see the people I love, who belong to me, and to whom I belong, flourish by being connected with the people who belong to them, and to whom they belong. The resulting network will be characterized by high trust and high cohesion, laying a solid foundation for content and ideas to efficiently propagate across the distributed social graph, similar to how the lightning network routes transactions. But the key to making this work is to rise to the occasion, and take back our digital sovereignty by making it as easy for the average person to navigate the digital social landscape as they do in real life.

