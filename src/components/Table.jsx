import React, { useState } from "react";
import PropTypes from "prop-types";

import { v4 as uuidv4 } from "uuid";
import { motion } from "framer-motion";
import "./table.css";
import TableLoader from "./TableLoader.jsx";

const Table = ({
                   data,
                   columns,
                   isFetching,
                   custom,
                   sticky,
                   totals,
                   shouldCollapse,
                   collapseDataKey, // Prop to define collapse data
               }) => {
    const [expandedRowId, setExpandedRowId] = useState(null);

    const toggleRowCollapse = (id) => {
        setExpandedRowId((prevState) => (prevState === id ? null : id));
    };

    const renderTotalRow = () => {
        if (!totals || totals.length === 0) return null;

        const totalColumns = columns.map((column, index) => {
            const totalDefinition = totals.find((total) => total.column === column);

            if (totalDefinition) {
                return (
                    <td
                        key={uuidv4()}
                        colSpan={totalDefinition.colSpan || 1}
                        className={totalDefinition.position === "label" ? "text-end" : ""}
                    >
                        {totalDefinition.position === "label" ? (
                            <strong>{totalDefinition.label}:</strong>
                        ) : (
                            totalDefinition.value
                        )}
                    </td>
                );
            }

            return index === totals[0]?.startIndex ? null : <td key={uuidv4()} />;
        });

        return <tr>{totalColumns}</tr>;
    };

    const renderCollapseTable = (collapseData) => {
        if (!collapseData || collapseData.length === 0) return null;
        return (
            <table className="table table-bordered table-sm">
                <thead>
                <tr>
                    {Object.keys(collapseData[0]).map((key) => (
                        <th key={uuidv4()}>{key}</th>
                    ))}
                </tr>
                </thead>
                <tbody>
                {collapseData.map((collapseRow) => (
                    <tr key={uuidv4()}>
                        {Object.keys(collapseRow).map((key) => (
                            <td key={uuidv4()}>{collapseRow[key]}</td>
                        ))}
                    </tr>
                ))}
                </tbody>
            </table>
        );
    };

    return (
        <div className="table-responsive">
            <table className="table table-striped table-bordered table-hover table-sm mb-3 text-nowrap align-middle">
                <thead>
                <tr role="row">
                    {columns.map((column) => (
                        <th
                            key={uuidv4()}
                            className={
                                (column === "Actions" ? "dt-body-right " : "") +
                                (sticky && sticky[column] ? "sticky" : "")
                            }
                            style={
                                custom && custom[column] ? { width: custom[column] } : {}
                            }
                        >
                            {column}
                        </th>
                    ))}
                </tr>
                </thead>
                <tbody>
                {isFetching &&
                    [...Array(5)].map((_, item) => (
                        <TableLoader key={uuidv4()} count={columns.length} />
                    ))}
                {data?.length > 0 &&
                    data?.map((row, index) => (
                        <React.Fragment key={uuidv4()}>
                            <tr
                                key={row.id}
                                onClick={
                                    shouldCollapse ? () => toggleRowCollapse(index) : undefined
                                }
                                style={{
                                    ...(shouldCollapse ? { cursor: "pointer" } : {}),
                                }}

                            >
                                {columns.map((column) =>
                                    column === "Actions" ? (
                                        <td key={uuidv4()} className="dt-body-right">
                                            {row[column]}
                                        </td>
                                    ) : (
                                        <td
                                            key={uuidv4()}
                                            className={sticky && sticky[column] ? "sticky" : ""}
                                        >
                                            {typeof row[column] === "string" &&
                                            !custom &&
                                            row[column]?.length > 15
                                                ? row[column].slice(0, 15) + "..."
                                                : custom && row[column]?.length > 50
                                                    ? row[column].slice(0, 50) + "..."
                                                    : row[column]}
                                        </td>
                                    )
                                )}
                            </tr>
                            {shouldCollapse && expandedRowId === index && (
                                <motion.tr
                                    key={uuidv4()}
                                    className="collapsed-row"
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: "auto" }}
                                    exit={{ opacity: 0, height: 0 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <td
                                        colSpan={columns.length}
                                        style={{ paddingLeft: "2rem" }}
                                    >
                                        {row[collapseDataKey] &&
                                            renderCollapseTable(row[collapseDataKey])}
                                    </td>
                                </motion.tr>
                            )}
                        </React.Fragment>
                    ))}
                {data?.length === 0 && !isFetching && (
                    <tr>
                        <td colSpan={columns.length} className="text-center">
                            No data found
                        </td>
                    </tr>
                )}
                {renderTotalRow()}
                </tbody>
            </table>
        </div>
    );
};

Table.propTypes = {
    data: PropTypes.array,
    columns: PropTypes.array.isRequired,
    isFetching: PropTypes.bool.isRequired,
    custom: PropTypes.object,
    sticky: PropTypes.object,
    totals: PropTypes.arrayOf(
        PropTypes.shape({
            column: PropTypes.string.isRequired,
            label: PropTypes.string,
            value: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
                .isRequired,
            colSpan: PropTypes.number,
            position: PropTypes.oneOf(["label", "value"]),
            startIndex: PropTypes.number,
        })
    ),
    shouldCollapse: PropTypes.bool,
    collapseDataKey: PropTypes.string, // Prop to define which data to collapse
};

Table.defaultProps = {
    shouldCollapse: false,
};

export default Table;
