"""Raw ছবি -> exact-duplicate বাদ -> stratified 70/15/15 split (train/val/test)."""
import hashlib
import shutil
from pathlib import Path

from sklearn.model_selection import train_test_split

RAW = Path("data/raw")
OUT = Path("data/split")
SEED = 42
EXT = {".jpg", ".jpeg", ".png"}


def md5(p: Path) -> str:
    return hashlib.md5(p.read_bytes()).hexdigest()


def main():
    if OUT.exists():
        shutil.rmtree(OUT)
    classes = sorted(d for d in RAW.iterdir() if d.is_dir())
    assert classes, f"{RAW} এর ভেতরে class ফোল্ডার নেই"
    n_raw = n_kept = 0
    print(f"{'class':24}{'raw':>6}{'kept':>6}{'train':>7}{'val':>5}{'test':>6}")
    for cdir in classes:
        cls = cdir.name.lower().replace(" ", "_")
        seen, files, c_raw = set(), [], 0
        for f in sorted(cdir.rglob("*")):
            if f.suffix.lower() not in EXT:
                continue
            n_raw += 1
            c_raw += 1
            h = md5(f)
            if h in seen:
                continue
            seen.add(h)
            files.append(f)
        n_kept += len(files)
        train, rest = train_test_split(files, test_size=0.30, random_state=SEED)
        val, test = train_test_split(rest, test_size=0.50, random_state=SEED)
        for name, group in (("train", train), ("val", val), ("test", test)):
            d = OUT / name / cls
            d.mkdir(parents=True, exist_ok=True)
            for i, f in enumerate(group):
                shutil.copy2(f, d / f"{i:04d}_{f.name}")
        print(f"{cls:24}{c_raw:>6}{len(files):>6}{len(train):>7}{len(val):>5}{len(test):>6}")
    print(f"\nraw={n_raw} kept={n_kept} dropped_duplicates={n_raw - n_kept}")


if __name__ == "__main__":
    main()