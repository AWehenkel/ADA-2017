# Title

# Abstract
>What makes a great song? It’s a big question, and one that has been written about endlessly in an attempt to unravel the “formula” for creating a world dominating smash hit record. Sure, there are some basic rules and if you were to examine a handful of the most successful or popular songs of the last four decades, they do have certain things in common. Intro, verse, bridge, chorus, verse, bridge, chorus, middle 8, chorus, chorus etc springs to mind! <a  href="http://www.makeitinmusic.com/what-makes-a-great-song/">makeitinmusic</a>    

We'll analyze a million songs metadata to extract what makes a song "hot", or "danceable". We'll look at different factors, like the loudness, the type of songs (tags), the duration, energy, tempo, etc.   
We'll also see what country produces the "best" songs, and what is the dominant type in each one. Moreover, we'll see if songs have changed a lot with the years, and if older songs are as appreciated as current ones.    
We'll obviously use the Million Song dataset for this.    
The main goal, in short is to learn more about music in general.    

# Research questions
What makes a good song (find correlations) ?     
Which country produces the "best" / "worst" songs ?    
Are there differences between countries ?     
Are there correlations between year of release and ratings ?    

# Dataset
We'll use the Million Song dataset. We'll simply download it, remove the Data folder (as we don't need the audio), therefore keeping only the Additional Files, and use Pandas to import the h5 and db files as DataFrames. We'll then filter out the columns we don't need (artist longitude latitude for example) and join the DataFrames to begin working on them. The size of the data will therefore be very manageable, as most of the 280GB is just audio.

# A list of internal milestones up until project milestone 2
| Week | To do |
| :------- | -------- |
| Week 1 | Get the data, import it, filter it |
| Week 2 | Find correlations for ratings |
| Week 3 | Find correlations for countries |
| Week 4 | ??? |

# Questions for TAs
-Should we focus more on only one/two questions ?    
-As there doesn't seem to be tags specific to tracks, we'll use the artist tags for correlations. Would it be better to look at the mean "hotness" of each artist or apply the tags to the tracks and work with them ?     
