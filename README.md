# My Portfolio Website

This is the website for my portfolio to show potential employers.  

The styling, for the time being, is only compliant with my laptop and those of similar dimensions.  I plan to add mobile/tablet/widescreen variations later on.

There is a security flaw (see miscellaneous below) and not everything is perfect, but it is getting there.  This is just the first iteration, and at the time of readme being updated, it was finished in just under a week (10/12/18 - 10/16/18).

## Deployed Links
Netlify: 
Heroku: 

## API's used
* Github
* Pexels

## Frontend
* React
* Axios

## Backend
* MongoDB
* Express
* Node

### Miscellaneous / To-do

* The form to send e-mails doesn't verify the user's e-mail before sending them a copy.  Therefore, it could be used in malicious ways.  Depending on how long it takes me to find a job, this is one of my top priorities to fix by implementing Oauth of some kind so that a verified e-mail is the only way to send a copy to yourself.

* The guessing game only accepts answers that are exactly correct, sans casing.  The various ways I tried implementing (as a small / negligible feature, I didn't spend much time trying) either allowed for too much or too little to be accepted.  Similarly to above, if time allows, I will fix this.

* Pexels pictures can be quite large, so for the time being it can be a bit of a drag after a search, unless you choose the boring/faster route.  I don't believe it is a matter of the API, but rather the page trying to render 4000x4000 pictures or what have you nine times.  I either need to look into cropping the picture or showing a low-res/placeholder image until the large photo is rendered.

* I'm partial to the creepy guy at the beginning, but the animations should be updated.  More faces, better than stick figure body, etc.

* I had initially intended to use redux as it was super helpful on the notes application I have (and would have been super helpful in my capstone project), but it for whatever reason seemed unnecessary as I went through this project.  Maybe later on.




