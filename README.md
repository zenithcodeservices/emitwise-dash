This is an assessment for the interview for Emitwise by Tim Lehane

## Getting Started

First, run the development server:

```bash
yarn
yarn next
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.


## Notes on assessment

- I was unsure what unit was used for the "value" in the data. I figured it would be best to note this in my submissino rather than unecessarily delay by contacting you and waiting for a response. I have made the assumption that the units roughly match up with the units on the axes provided in the figma file - being Emissions Intensity (kgCO2e / m2) and Total emissions (tCO2e).
- In order to match the scales as shown in the figma file, I have assumed that Total emissions values are 10 times bigger than Emissions Intensity. However, there is a chance that the figma file is not as accurate a guide as I think, if this is the case please let me know!
- The API is called within the component, this could be moved to an 'api' folder to be properly decoupled.
- The application is truly a minimal single page application, there are no navigation features, it is possible that a page like this would be used in a blog post and/or is an MVP - therefore I have not implemented the navbar routing.