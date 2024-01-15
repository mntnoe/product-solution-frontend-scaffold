export interface IBuildContext {
  projectRoot: string;
  config: BuildConfig;
}
export interface BuildContext extends IBuildContext {}

export class BuildContext {
  constructor(options: IBuildContext) {
    Object.assign(this, options);
  }

  /**
   * Apply a configuration profile.
   *
   * For now it should only be called on the default context, but could be
   * expanded to handle nested profiles.
   */
  async withProfile(profile: ProfileId): Promise<BuildContext> {
    if (profile === "default") return Promise.resolve(this);
    const { default: overrides } = await import(`./profiles/${profile}.js`);
    return new BuildContext({
      ...this,
      config: {
        ...this.config,
        ...overrides,
        features: {
          ...this.config.features,
          ...overrides.features,
        },
      },
    });
  }
}

export interface BuildConfig {
  minify: boolean;
  features: { [feature in FeatureId]?: boolean };
}

export type BuildProfile = Partial<BuildConfig>;

export const defaultConfig: BuildConfig = {
  minify: true,
  features: {
    RemoteLogging: true,
  },
};
