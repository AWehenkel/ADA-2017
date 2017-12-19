# Logic in song - SuperHit, story and pattern study

# Abstract
>What makes a great song? It’s a big question, and one that has been written about endlessly in an attempt to unravel the “formula” for creating a world dominating smash hit record. Sure, there are some basic rules and if you were to examine a handful of the most successful or popular songs of the last four decades, they do have certain things in common. Intro, verse, bridge, chorus, verse, bridge, chorus, middle 8, chorus, chorus etc springs to mind! <a  href="http://www.makeitinmusic.com/what-makes-a-great-song/">makeitinmusic</a>    

We'll analyze a million songs metadata to extract what makes a song "hot", or "danceable". We'll look at different factors, like the loudness, the type of songs (tags), the duration, energy, tempo, etc.   
We'll also see which country produces the "best" songs, and what is the dominant type in each one. Moreover, we'll see if songs have changed a lot with the years, and if older songs are as appreciated as current ones.    
We'll obviously use the Million Song dataset for this.    
The main goal, in short is to learn more about music in general.    

# Research questions
What makes a good song (find correlations) ?     
Which country produces the "best" / "worst" songs ?    
Are there differences between countries ?     
Are there correlations between year of release and ratings ?     
Are there recurrent patterns depending on the period of the year ?
How these tendencies evolve if we condition to the genre of songs?
How genres have evolved over time?
What is the evolution of hotness depending on different features?

# Dataset
We'll use the Million Song dataset. We'll simply download it, remove the Data folder (as we don't need the audio), therefore keeping only the Additional Files, and use Pandas to import the h5 and db files as DataFrames. We'll then filter out the columns we don't need (artist longitude latitude for example) and join the DataFrames to begin working on them. The size of the data will therefore be very manageable, as most of the 280GB is useless for us (we'll only need the additional files of the MSD).

# A list of internal milestones up until project milestone 2
| Week | To do |
| :------- | -------- |
| Week 1 | Get the data, import it, filter it |
| Week 2 | Find correlations for ratings |
| Week 3 | Find correlations for countries |
| Week 4 | Complete Milestone 2 |
| Week 5 | Begin the datastory structure |
| Week 6 | Work on the datastory and chose of important things to show |
| Week 7 | Write the comments of the data story |

# Data analysis
We extracted, enriched using Spotify and merged the data (see the readme in the data folder). As the data is biased (as read on MSD), it will probably be hard to reach any conclusion.

# New plan for milestone 3
- Forget about countries (biased dataset, not enough data)
- Use ML (forest) to find features importance / General analysis of features
- Continue working on year / genre analysis

# Members contributions
We all worked in paralell and cross checked our work. However each member of the group focused his work on one specific sub-analysis.
- Quentin
  - Dataset Cleaning
  - Feature analysis section
  - Coding the spotify api calls
  - Most of the datastory coding and comments
- Antoine
  - Dataset Cleaning
  - Genre analysis section
  - Datasets merging
  - Genre analysis part in datastory(comments and coding)
- Guillaume
  - Initial dataset exploration
  - Help for spotify
  - Year analysis section
  - README
  - Proofreading
# Poster presentation
We will work together during one morning the week before the presentation to chose which figures and which results to present onto the poster.
