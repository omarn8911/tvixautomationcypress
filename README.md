# Introduction 

This repository is to demonstrate Cypress E2E testing with the next site: http://qalab.pl.tivixlabs.com/

# Getting Started

1.	Install Node Package Manager. (If needed)
2.	Initialize Node Package Manager. (Downloads should be kept within the tvixautomationchallenge folder) 
3.	Install Cypress. (If needed: npm install cypress)

# Build and Test

1. Pull the latest repository.
2. Verify software's latest versions. (Review step)
4. Update software's latest versions, if needed.
5. Run terminal command "npx cypress open" 
6. Execute search_cars.js test from the cypress execution window to see the tests runing

# Aditional notes to have in mind:

1. Due to the web app has a not secure domain, I used the "chromeWebSecurity": false configuraton to make cypress to suppport it.
2. Due to some test are flaky (not reliable), I set up the next configuration to make sure that the tests pass most consistently:

   "retries": {
        "runMode": 2,
        "openMode": 3
    }
