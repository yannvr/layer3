# **Layer3 Leaderboard – Test Assignment**  

The aim was to deliver a robust solution (unit test and UI test) while keeping the code simple and easy to read.

---

## **Setup **  

- ```pnpm install ```
- ```pnpm run test ``` run all tests
- ```pnpm run dev ``` run the server
- ```pnpm run storybook``` open storybook


## Approach
Having an expressive semantic and modular code has driven my approach. The project stucture and name convention should make it obvious to review and maintain. Separation of concerns is reflected through the file strcuture and name convention.

## Stack considerations
- React with Vite is good choice for performance. Bun is also used for the same reason.
- Styled component enabled the use of meaningful component name so the LeaderBoard reads as the sum of it's underlying components
- Styling:
  - css vars are used for consistency when a color is used in multiple place
  - no framework was used to reduce any overhead (that is why tailwind was not used)
- Network layer:
  - data fetching operations are all handled by hooks for clairy
  - User view
    - balances and transactions are fetched using Moralis API
    - NFTs are fetched using OpenSea
    - tab content is relative to the select chain (one of Ethereum, BSC or Polygon)

---

## Notes

- API considerations:
  - the layer3 endpoint has a CORS issue during implementation so a fallback has been provided but the request is still made for demonstration
  - OpenSea is used to fetch the user's NFT collection; The API key is included but on production, a dedicated endpoint would be used to hide the key
- UI:
  - NFT are visible on hovering the NFT icons
  - Top three users are highlighted


## Test

Test are limited to the LeaderBoard for this test but same patterns will apply to all components:
  - Unit test is done via Jest. Some tests look for component essential features in rendering but snapshots tests are also used to provide a full coverage of the semantic.
  - Storybook is used for testing basic test cases and was used to test and style the UI without having to reload the app and refetch data
  - Raw component is used to decouple rendering from data fetching and to enable UI testing

## Improvement
- Provide full test coverage
- Implement caching mechanism to reduce redundant requests
- Improve mobile responsiveness to make the app more accessible
- Use fontawesome to provide consistent icons
- improvement of network handling for loading and errors on UI
- creating a Vite proxy to centralize network requests
