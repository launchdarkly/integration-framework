module.exports = function (plop) {
  plop.setGenerator('integration', {
    description: 'add a new integration to integration framework',

    // inquirer prompts
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'Company or Integration name:',
      },
      {
        type: 'input',
        name: 'website',
        message: 'Company URL:',
      },
      {
        type: 'input',
        name: 'supportEmail',
        message: 'Support Email Address:',
      },
      {
        type: 'input',
        name: 'author',
        message: 'Author, can be company or individual:',
      },
      {
        type: 'input',
        name: 'overview',
        message:
          'Quick overview of the integration. (minimum 10 characters). Longer description will be asked next:',
      },
      {
        type: 'input',
        name: 'description',
        message:
          'In-depth description of the integration when user clicks on?  Minimum 50 characters:',
      },
    ],

    // actions to perform
    actions: [
      {
        type: 'add',
        path: 'integrations/{{dashCase name}}/manifest.json',
        templateFile: 'template/integration/manifest.json.hbs',
      },
      {
        type: 'add',
        path: 'integrations/{{dashCase name}}/assets/horizontal.svg',
      },
      {
        type: 'add',
        path: 'integrations/{{dashCase name}}/assets/square.svg',
      },
      'Congratulations! You have created a new LaunchDarkly integration.',
      "Don't forget, any lines in the manifest.json with $FIX_ME will need to be manually updated in the manifest.",
      'The empty files in under your new directory `/assets` should be replaced with SVGs of the logo.',
    ],
  });
};
