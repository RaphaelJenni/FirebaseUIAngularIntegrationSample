import { FirebaseUIAngularIntegrationPage } from './app.po';

describe('firebase-uiangular-integration App', function() {
  let page: FirebaseUIAngularIntegrationPage;

  beforeEach(() => {
    page = new FirebaseUIAngularIntegrationPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
