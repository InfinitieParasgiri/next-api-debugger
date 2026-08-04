import { classNames } from '../core/utils';
import { HttpMethod, StatusFilter } from '../types';

interface FilterBarProps {
  status: StatusFilter;
  onStatusChange: (status: StatusFilter) => void;
  methods: HttpMethod[];
  activeMethods: HttpMethod[];
  onToggleMethod: (method: HttpMethod) => void;
}

export function FilterBar({ status, onStatusChange, methods, activeMethods, onToggleMethod }: FilterBarProps) {
  return (
    <>
      <button
        type="button"
        className={classNames('apd-chip apd-chip-success', status === 'success' && 'apd-active')}
        onClick={() => onStatusChange(status === 'success' ? 'all' : 'success')}
      >
        Success
      </button>
      <button
        type="button"
        className={classNames('apd-chip apd-chip-failed', status === 'failed' && 'apd-active')}
        onClick={() => onStatusChange(status === 'failed' ? 'all' : 'failed')}
      >
        Failed
      </button>
      {methods.map((method) => (
        <button
          key={method}
          type="button"
          className={classNames('apd-chip', activeMethods.includes(method) && 'apd-active')}
          onClick={() => onToggleMethod(method)}
        >
          {method}
        </button>
      ))}
    </>
  );
}
