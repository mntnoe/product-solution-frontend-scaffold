import { PackageIcon } from "@my-company/warehoox/components/icons";
import s from "@my-company/warehoox/features/site/site.module.css";

type Props = {
  solutionName: string;
  children?: React.ReactNode;
};

export function Site({ solutionName, children }: Props) {
  return (
    <div className={s.site}>
      <header className={s.header}>
        <div className={s.headerInner}>
          <PackageIcon size={40} />
          <div className={s.solution}>{solutionName}</div>
          <div className={s.title}>warehoox</div>
        </div>
      </header>
      <main className={s.content}>
        <div className={s.contentInner}>{children}</div>
      </main>
    </div>
  );
}
