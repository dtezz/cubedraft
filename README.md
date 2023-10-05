# cubedraft

App for gathering draftin data on mtg cubes

Goals:

- Able to import Cube data (raw text card list or imported from service like Cube Cobra(CC)) and store cubes in database
- Automatically update cubes that are linked from CC and update databases appropriately. Don't remove card or card data from
  database even if card removed from cube
- Data to store:
  pick order (Based on pack)
  what cards are often drafted with a single card
  card win %
  deck archtype win %
  color win %?

Current State:

10-4-23

- front-end application that uses scryfall api to search for card based on user input and returns a single card image
- now with a random button!

WIP

- working on user signup/login
- allow user to add card to favorites
- allow user to see their list of favorites
