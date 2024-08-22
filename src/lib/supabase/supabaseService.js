class SupabaseService {
	#supabase;
	#table;
	constructor(supabaseClient, table) {
		this.#supabase = supabaseClient;
		this.#table = table;
	}

	async add(data) {
		const { data: newData, error } = await this.#supabase.from(this.#table).insert(data);

		if (error) {
			throw error;
		}

		return newData;
	}

	async get(limit = null) {
		if (limit) {
			const { data, error } = await this.#supabase
				.from(this.#table)
				.select('*')
				.order('created_at', { ascending: false })
				.limit(limit);

			if (error) {
				throw error;
			}

			return data;
		} else {
			const { data, error } = await this.#supabase.from(this.#table).select('*');

			if (error) {
				throw error;
			}

			return data;
		}
	}

	async update(id, changes) {
		const { data: updatedData, error } = await this.#supabase
			.from(this.#table)
			.update(changes)
			.eq('id', id);

		if (error) {
			throw error;
		}

		return updatedData;
	}

	async delete(id) {
		const { data: deletedData, error } = await this.#supabase
			.from(this.#table)
			.delete()
			.eq('id', id);

		if (error) {
			throw error;
		}

		return deletedData;
	}

	async search(keyword, column) {
		if (column) {
			const { data, error } = await this.#supabase
				.from(this.#table)
				.select()
				.ilike(column, `%${keyword}%`);
			if (error) {
				throw error;
			}
			console.log(data);
			return data;
		}
		return [];
	}

	async eq(id, column) {
		if (column) {
			const { data, error } = await this.#supabase.from(this.#table).select().eq(column, id);
			if (error) {
				throw error;
			}
			console.log(data);
			return data;
		}
		return [];
	}
}

export default SupabaseService;
