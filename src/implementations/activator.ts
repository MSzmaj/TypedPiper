import { Type } from "..";

const Activator = new class {
    resolve<T>(target: Type<any>): T {
      //@ts-ignore - `reflect-metadata` is a peer dependency and isn't directly imported as part of this module.
      let tokens = Reflect.getMetadata('design:paramtypes', target) || [],
          injections = tokens.map((token: Type<any>) => Activator.resolve<any>(token));
      
      return new target(...injections);
    }
  };

  export { Activator };