import {BootMixin} from '@loopback/boot';
import {ApplicationConfig} from '@loopback/core';
import {RepositoryMixin} from '@loopback/repository';
import {RestApplication} from '@loopback/rest';
import {
  RestExplorerBindings,
  RestExplorerComponent,
} from '@loopback/rest-explorer';
import {ServiceMixin} from '@loopback/service-proxy';
import path from 'path';
import {MySequence} from './sequence';
// import the AuthenticationServiceComponent
import {AuthenticationServiceComponent, KeycloakAuthenticationProvider, KeycloakVerifyProvider, UserValidationServiceBindings} from '@sourceloop/authentication-service';
import {Strategies} from 'loopback4-authentication';
import {KeycloakStrategyFactoryProvider} from 'loopback4-authentication/passport-keycloak';
import {
  AuthorizationBindings,
  UserPermissionsProvider,
} from 'loopback4-authorization';


export {ApplicationConfig};

export class MicadoBackendApplication extends BootMixin(
  ServiceMixin(RepositoryMixin(RestApplication)),
) {
  constructor(options: ApplicationConfig = {}) {
    super(options);

    // Set up the custom sequence
    this.sequence(MySequence);

    // Set up default home page
    this.static('/', path.join(__dirname, '../public'));

    // Customize @loopback/rest-explorer configuration here
    this.configure(RestExplorerBindings.COMPONENT).to({
      path: '/explorer',
    });
    this.component(RestExplorerComponent);
    // add Component for AuthenticationService
    this.component(AuthenticationServiceComponent);


    this.bind(UserValidationServiceBindings.KEYCLOAK_AUTHENTICATION.key).toProvider(
      KeycloakAuthenticationProvider,
    );
    this.bind(AuthorizationBindings.USER_PERMISSIONS).toProvider(
      UserPermissionsProvider,
    );

    this.bind(Strategies.Passport.KEYCLOAK_VERIFIER).toProvider(
      KeycloakVerifyProvider,
    );

    this.bind(Strategies.Passport.KEYCLOAK_STRATEGY_FACTORY).toProvider(
      KeycloakStrategyFactoryProvider,
    );

    this.projectRoot = __dirname;
    // Customize @loopback/boot Booter Conventions here
    this.bootOptions = {
      controllers: {
        // Customize ControllerBooter Conventions here
        dirs: ['controllers'],
        extensions: ['.controller.js'],
        nested: true,
      },
    };
  }
}
